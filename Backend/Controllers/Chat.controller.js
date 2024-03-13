import { createChat, createGroupChat, getAllChatsBySenderReceiver, getAllChatsByUserId, updateChatName } from "../Database/Chats.query.js"
import { findSingleUserIdByEmail } from "../Database/Users.query.js"
import { CustomStatusCodes } from "../Utilities/CustomStatusCodes.js"

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

const getAllChatsByUser = async (req, res) => {
    const { email } = req
    const sender = await findSingleUserIdByEmail(email)

    const chats = await getAllChatsByUserId(sender.id)
    res.status(200).send(chats)

}


const newGroupChat = async (req, res) => {
    const { email } = req
    const { users, name } = req.body
    const userIds = JSON.parse(users)

    console.log("users:", userIds)

    const currentUser = await findSingleUserIdByEmail(email)
    userIds.push(currentUser.id)

    let createdGroupChat = await createGroupChat(name, userIds, currentUser.id)
    console.log(createdGroupChat)

    res.status(200).send(createdGroupChat)

}

const renameGroupChat = async (req, res) => {
    const { email } = req
    const { chatid, newname } = req.body
    const currentUser = await findSingleUserIdByEmail(email)

    try {
        const updatedChat = await updateChatName(chatid, newname, currentUser.id)
        console.log(updatedChat)
        res.status(200).send(updatedChat)
    } catch (error) {
        res.status(404).send({
            message: "USER_NOT_ADMIN",
            code: CustomStatusCodes.USER_NOT_FOUND
        })
    }

}

export {
    getOrCreateSingleChat,
    getAllChatsByUser,
    newGroupChat,
    renameGroupChat
}