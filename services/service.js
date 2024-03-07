const { getPublicKey,dynamicReponse } = require("../utils/utils");
const {  signNack,invalidNack } = require("../utils/acknowledgement");
const log = require("../utils/logger");
const config = require("../utils/config");
const { validateRequest, verifyHeader ,validateSchema} = require("./validation");
// const triggerMapper = require("../utils/json_mapper")
const getBecknObject = require("../json_mapper/services")
const {generateSession} = require ("../json_mapper/core/session")
const { ack, schemaNack,sessionNack,sessionAck } = require("../utils/acknowledgement");

//getting path object from config file

var paths;
var props;
var security;
var logger;
var server;
const matchText = 'form/' 

const onRequest = async (req, res) => {
  if (paths == undefined) {
    logger = log.init();
    props = config.getConfig();
    security = props.security;
    server = props.server;
    paths = props.path;
    PROTOCOL_SERVER_DOMAINS = props.server.protocol_server
  }
  try {
    let api = req.params['0']

    // session
    if(api == 'session'){
        generateSession(req.body)
        return res.json(sessionAck)
    }




    const isFormFound = req.params['0']?.match(matchText); //true if incoming request else false
    if(isFormFound){
      api = req.params['0'].replace(/\//g, '_'); 
    }
    logger.info(`Received ${req.url} api request`);
    if (security.verify_sign && !isFormFound) { //don't check header if form is around
      if (!await verifyHeader(req, security)){
        // Handle the case when signature is not verified
        res.status(400).json(signNack);
        logger.error("Authorization header not verified ");
        return; // Make sure to return to exit the function
    } 
  }

    //getting the callback url from config file
    let callbackConfig;
    let context;
    if (paths[api]) {
      // TODO add senario selection
      context = {
        req_body: req.body,
        apiConfig: paths[api],
      };
      //do validation
      logger.info(`Validating ${api} request`);
      // validate schema
      if(isFormFound || await validateSchema(context)){

        if(PROTOCOL_SERVER_DOMAINS.includes(context.req_body.context.domain)){ //json mapper
          context.req_body = await getBecknObject(context.req_body) 
          if(context.req_body == null){
            res.status(400).send(sessionNack)
          }
        }
        
        callbackConfig = dynamicReponse(context)
        await validateRequest(context, callbackConfig, res, security, server, isFormFound);


      }else{
        schemaNack.error.path = JSON.stringify(error_list)
        return res.json(schemaNack)
      }
 
    } else {
      logger.error("Invalid Request");
      return res.json(invalidNack);
    }
    

  } catch (error) {
    logger.error("ERROR!!", error);
    console.trace(error);
  }
};

module.exports = { onRequest };
