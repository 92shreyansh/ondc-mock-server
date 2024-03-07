const createBecknObject = require("./core/mapper_core")
const {getSession,insertSession,generateSession} = require("./core/session")

const getBecknObject = async (payload)=>{
  return new Promise(async (resolve,reject)=>{
    const config = payload.context.action
    // const payload = req.body
    const transaction_id = payload.context.transaction_id
    let session = getSession(transaction_id)

    if(!session) {
      await generateSession({version: "2.0.0",country: "IND",cityCode: "std:044",configName: "metro-flow-1",transaction_id: transaction_id})
      
      session = getSession(transaction_id)
      }
    const {payload: becknPayload, session: updatedSession} = createBecknObject(
        session,
        session.protocolCalls[config],
        payload,
        session.protocolCalls[config].protocol
      );
      insertSession(updatedSession)
      resolve(becknPayload)
  })
 
}


module.exports = getBecknObject