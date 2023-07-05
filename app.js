const express = require("express");
const log = require("./utils/logger");
const app = express();
const config = require("./utils/config.js");
const router = require("./routes/route");

const $RefParser = require("json-schema-ref-parser");
const fs = require("fs");
const Handlebars = require("handlebars");
const yaml = require("js-yaml");
const baseTemplate = "./yaml-templates/baseTemplate.yaml";
const buildYamlFile = "./build/build.yaml";
const baseDefault = "./yaml-templates/baseDefault.yaml";
const exampleConfig = "./yaml-templates/exampleConfig.yaml";
const {SUB_INSTRUCTION_FOLDERS, template_paths, allowedAttributes} = require('./utils/constants')

const args = process.argv.slice(2);
var configFile = args[0];
if (!configFile || configFile == "") {
  configFile = "./config.yaml";
}

async function baseYMLFile(file) {
  try {
    const schema = await $RefParser.dereference(file);
    return schema;
  } catch (error) {
    console.error("Error parsing schema:", error);
  }
}
//read the build.yaml file
createInstructionSet(buildYamlFile);

async function generateYaml(path, data, isJSON) {
  if (typeof data === "string" || isJSON) {
    if (isJSON) {
      data = JSON.stringify(data);
    }
    return fs.writeFileSync(path, data);
  }
  fs.writeFileSync(path, yaml.dump(data));
}

async function addHandleBars(path, examples) {
  for (let paths of Object.keys(examples)) {
    //create dynamic template for context for now
    if (paths === "context") {
      for (let attribs of Object.keys(examples[paths])) {
     
        if (allowedAttributes.hasOwnProperty(attribs)) {
          examples[paths][attribs] = `{{${allowedAttributes[attribs]}}}`;
          // if(examples[paths]?.action?.substring(0,2) === "on" && attribs === "message_id"){
          //   examples[paths]['message_id'] = `{{message_id}}`;
          // }else{
          //   examples[paths][attribs] = `{{${allowedAttributes[attribs]}}}`;
          // }
        }
      }
    }
  }
  generateYaml(path, examples);
}

async function traverseExamples(exampleSet, folderRef, templateFile) { 
  let paths = {};
  for (const example of Object.keys(exampleSet)) {
    const { examples } = exampleSet[example];
    const path = `${folderRef}/${example}.yaml`;
    //creating paths for on-demand.yaml here
    if (templateFile) {
      let pathObject = { [example]: "" };

      const baseObject = {
        schema: {
         '$ref': `${folderPath.substring()}/schema/${example}.yaml`
          //$ref: `${__dirname}/${folderPath.substring()}/schema/${example}.yaml`,
        },
        callbacks: {
          //$ref: `${__dirname}/${folderPath.substring()}/${example}.yaml`,
          $ref: `${folderPath.substring()}/${example}.yaml`,
        },
      };
      pathObject[example] = baseObject;
      paths = { ...paths, ...pathObject };
    } else {
      addHandleBars(path, examples[0]?.value);
      //generateYaml(path, examples[0]?.value);
    }
  }
  //creating on-demand.yaml here
  if (Object.keys(paths)?.length) {
    let readConfigTemplate = fs.readFileSync(templateFile, "utf-8");
    let template = Handlebars.compile(readConfigTemplate);
    const result = template({ type: "BAP/BPP" });
    readConfigTemplate = yaml.load(result);
    readConfigTemplate.path = paths;
    generateYaml(folderRef, readConfigTemplate);
  }
}
async function traverseSchema(exampleSet, folderRef, type, templateSchema) {
  for (const schema of Object.keys(exampleSet)) {
    let schemas =
      exampleSet[schema]["post"]["requestBody"]["content"]["application/json"][
        "schema"
      ];
    const path = `${folderRef}/${schema}`;
    if (type) {
      const readTemplateFile = fs.readFileSync(templateSchema, "utf-8");
      let template = Handlebars.compile(readTemplateFile);
      let data = {};
      const removeExtraChar = schema.substring(1);
      if (template_paths.hasOwnProperty(removeExtraChar)) {
        if (type === "default") {
          data.callback = `${template_paths[removeExtraChar]}`;
          data.payload = template_paths[removeExtraChar]
            ? `./template/${template_paths[removeExtraChar]}.yaml`
            : "";
        } else {
          data.ref = `../payloads/${removeExtraChar}.yaml`;
        }
        schemas = template(data);
        generateYaml(`${path}.yaml`, schemas);
      }
    } else {
      generateYaml(`${path}.yaml`, schemas);
    }
  }
}
var folderPath;
async function createInstructionSet(file) {
  try {
    const buildFile = await baseYMLFile(file);
    const examples = buildFile["x-examples"];
    const paths = buildFile["paths"];
    //check entered build.yaml has on-demand exist or not
    if (examples.hasOwnProperty(configFile)) {
      const { example_set: exampleSet } = examples[configFile];
      folderPath = `./${configFile}`;
      //remove previous directory on every run
      fs.rmSync(folderPath, { recursive: true, force: true });
      fs.mkdirSync(folderPath, {
        recursive: true,
      });
      for (let path = 0; path < 6; path++) {
        if (path < 4) {
          fs.mkdirSync(`${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`);
        }

        if (path === 0) {
          //payloads
          await traverseExamples(
            exampleSet,
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`
          );
        } else if (path === 1) {
          //operations
          const baseOperations = "./yaml-templates/baseOperations.yaml";
          const readOperationsTemplate = fs.readFileSync(
            baseOperations,
            "utf-8"
          );
          generateYaml(
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}/req_body.yaml`,
            readOperationsTemplate
          );
        } else if (path === 2) {
          //template
          await traverseSchema(
            paths,
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`,
            "template",
            baseTemplate
          );
        } else if (path === 3) {
          //schema
          await traverseSchema(
            paths,
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`
          );
        } else if (path === 4) {
          //config file
          await traverseExamples(
            exampleSet,
            `${folderPath}/${configFile}.yaml`,
            exampleConfig
          );
        } else {
          //create files at on-demand root
          await traverseSchema(paths, `${folderPath}`, "default", baseDefault);
        }
      }
      const file = `${folderPath}/${configFile}.yaml`;
      startUp(file);
    } else {
      throw `${configFile} instruction set not found`;
    }
  } catch (error) {
    console.log("Error in createInstructionSet()", error);
  }
}

//After instuctionSet completion, read response here
async function startUp(file) {
  await config.loadConfig(file);
  const server = config.getServer();
  app.use(express.json());
  const logger = log.init();
  app.listen(server.port, () => {
    logger.info(`This app is running on port number : ${server.port}`);
  });
  app.use(router);
}

// startUp();
