const config = require("../utils/config");
const log = require("../utils/logger");
const axios = require("axios");

//getting path object from config file

var logger;

const trigger = (context, config, data) => {
  logger = log.init();
  let uri = context.response_uri;
  let api = config.callback;
  let delay = config.delay;
  try {
    logger.info("Inside trigger service");
    setTimeout(() => {
      axios
        .post(`http://localhost:5500/${api}`, data)
        .then((response) => {
          logger.info(
            `Triggered ${api} response at ${uri}${api}`
          );
        })
        .catch(function (error) {
          logger.error(error);
        });
    }, delay);
  } catch (error) {
    logger.error(`!!Error while triggering the response,`, error);
  }
};

module.exports = { trigger };
