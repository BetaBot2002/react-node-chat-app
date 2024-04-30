import { createNewMessage, getAllMessagesByChatId } from "../Database/Messages.query.js"
import { findSingleUserIdByEmail } from "../Database/Users.query.js"

const sendMessage=async (req,res)=>{
    let {chatId,content}=req.body
    const { email } = req
    const sender = await findSingleUserIdByEmail(email)

    try {
        let data=await createNewMessage(sender.id,content,chatId)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({
            message:"Invalid"
        })
    }

}


const getAllMessages=async (req,res)=>{
    const {chatId}=req.params
    try {
        const messages=await getAllMessagesByChatId(chatId)
        res.status(200).send(messages)
    } catch (error) {
        res.status(400).send({
            message:"Invalid"
        })
    }

}

export {
    sendMessage,
    getAllMessages
}