import { addReader, createNewMessage, getAllMessagesByChatId } from "../Database/Messages.query.js"
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

const readMessage=async (req,res)=>{
    let {messageIds,userId}=req.body
    messageIds=JSON.parse(messageIds)
    try {
        const updatedMessage=await addReader(messageIds,userId)
        res.status(200).send(updatedMessage)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message:error.message
        })
    }
}

export {
    sendMessage,
    getAllMessages,
    readMessage
}