import { createNewMessage } from "../Database/Messages.query.js"
import { findSingleUserIdByEmail } from "../Database/Users.query.js"

const sendMessage=async (req,res)=>{
    let {chatId,content}=req.body
    const { email } = req
    const sender = await findSingleUserIdByEmail(email)

    let data=await createNewMessage(sender.id,content,chatId)
    res.send(data)

}

export {
    sendMessage
}