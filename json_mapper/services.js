const createBecknObject = require("./core/mapper_core")
const {getSession,insertSession} = require("./core/session")

const getBecknObject = (payload)=>{
    const config = payload.context.action
    // const payload = req.body
    const transaction_id = payload.context.transaction_id
    let session = getSession(transaction_id)
    if(!session) {
        return null
      }
    const {payload: becknPayload, session: updatedSession} = createBecknObject(
        session,
        session.protocolCalls[config],
        payload,
        session.protocolCalls[config].protocol
      );
      insertSession(updatedSession)
    return becknPayload
}


module.exports = getBecknObject