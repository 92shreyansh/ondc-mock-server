const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  strict: "log",
});
const addFormats = require("ajv-formats");

addFormats(ajv);
require("ajv-errors")(ajv);

const validateSchema = async (payload,schema) => {
    // console = log.init();
    console.info(
      `Inside schema validation service for ${payload?.context?.action} api protocol server`
    );
    try {
      const validate = ajv.compile(schema);
      const valid = validate(payload);
      if (!valid) {
        let error_list = validate.errors;
        console.error(JSON.stringify(formatted_error(error_list)));
        console.error("Schema validation : FAIL");
        console.error(payload?.context?.transaction_id)
        return false;
      } else {
        console.info("Schema validation : SUCCESS");
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

module.exports = validateSchema