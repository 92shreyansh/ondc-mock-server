const {setCache,getCache} = require("./cache")
const fs = require("fs");
const yaml = require("yaml");
const path = require("path");
const $RefParser = require("@apidevtools/json-schema-ref-parser");


const insertSession = (session) => {
  setCache("jm_" + session.transaction_id, session, 86400) 
}; 

const getSession = (transaction_id) =>{
 return ( getCache("jm_" + transaction_id));
}

 function loadConfig(){
  return new Promise(async (resolve,reject)=>{
    try {
      const config = yaml.parse(
        fs.readFileSync(path.join(__dirname, "../configs/index.yaml"), "utf8")
      );

  
      const schema = await $RefParser.dereference(config);
  
      this.config = schema;
  
      resolve(schema)
    } catch (e) {
      throw new Error(e);
    }
  })
}


const getConfigBasedOnFlow = async (flowId) =>{
  return new Promise(async (resolve,reject)=>{
    try{
      this.config = await loadConfig()
  
      let filteredInput = null;
      let filteredCalls = null;
      let filteredDomain = null;
      let filteredSessiondata = null;
      let filteredAdditionalFlows = null;
      let filteredsummary = "";
    
      this.config.flows.forEach((flow) => {
        if (flow.id === flowId) {
          const { input, calls, domain, sessionData, additioalFlows, summary } =
            flow;
          filteredInput = input;
          filteredCalls = calls;
          filteredDomain = domain;
          filteredSessiondata = sessionData;
          filteredAdditionalFlows = additioalFlows || [];
          filteredsummary = summary;
        }
      });
    
      resolve({
        filteredCalls,
        filteredInput,
        filteredDomain,
        filteredSessiondata,
        filteredAdditionalFlows,
        filteredsummary,
      })

    }
    catch(err){
      console.log("error",err)
    }
  })

}

async function generateSession(){
  let req= {}
  req.body = {
      version: "2.0.0",
      country: "India",
      cityCode: "std:044",
      configName: "metro-flow-1",
      transaction_id: "629fdfe9-e77c-4d79-aa94-2da2de09f660"
  }
  const {
    version,
    country,
    cityCode,
    transaction_id,
    configName
  } = req.body;


  const {
    filteredCalls,
    filteredInput,
    filteredDomain,
    filteredSessiondata,
    filteredAdditionalFlows,
    filteredsummary
  } = await getConfigBasedOnFlow(configName);
  
  const session = {
    ...req.body,
    bap_id: "mobility-staging.ondc.org",
    bap_uri: process.env.callbackUrl,
    ttl: "PT10M",
    domain: filteredDomain,
    summary: filteredsummary,
    ...filteredSessiondata,
    currentTransactionId: transaction_id,
    transactionIds: [transaction_id],
    input: filteredInput,
    protocolCalls: filteredCalls,
    additioalFlows: filteredAdditionalFlows
  };
  
  
  insertSession(session);
}



module.exports = {generateSession,getSession,insertSession}