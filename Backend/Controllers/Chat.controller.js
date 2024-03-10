import { createChat, getAllChatsBySenderReceiver } from "../Database/Chats.query.js"
import { findSingleUserIdByEmail } from "../Database/Users.query.js"

const getOrCreateSingleChat = async (req, res) => {
    const { email } = req
    const { receiverEmail } = req.body

    const sender = await findSingleUserIdByEmail(email)
    const receiver = await findSingleUserIdByEmail(receiverEmail)

    let isChat = await getAllChatsBySenderReceiver(sender.id, receiver.id)
    // console.log(isChat.length)

    if (isChat.length > 0) {
        res.status(200).send(isChat[0])
    } else {
        const chatCreated = await createChat(sender.id, receiver.id)
        res.status(200).send(chatCreated)

    }

}

export {
    getOrCreateSingleChat
}