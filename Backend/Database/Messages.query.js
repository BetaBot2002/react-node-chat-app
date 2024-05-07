import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const selectedUserFields = {
    id: true,
    email: true,
    name: true,
    profilePic: true
}

const selectedChatFields = {
    id: true,
    chatName: true,
    isGroupChat: true,
    userIds: true,
    users: {
        select: selectedUserFields
    },
    adminIds: true,
    admins: {
        select: selectedUserFields
    },
}

const selectedMessageFields = {
    id: true,
    content: true,

    senderId: true,
    sender: {
        select: selectedUserFields
    },

    readersIds: true,
    readers: {
        select: selectedUserFields
    },

    chatId: true,
    chat: {
        select: selectedChatFields
    },
}

const createNewMessage = async (userId, content, chatId) => {
    return await prisma.messages.create({
        data: {
            content: content,
            sender: {
                connect: { id: userId }
            },
            chat: {
                connect: { id: chatId }
            }
        },
        include: {
            sender: {
                select: selectedUserFields
            },
            chat: {
                select: selectedChatFields
            },
        }
    })
}

const getAllMessagesByChatId = async (chatId) => {
    return await prisma.messages.findMany({
        where: {
            chatId: chatId
        },
        include: {
            sender: {
                select: selectedUserFields
            },
            readers: {
                select: selectedUserFields
            },
            chat: true
        }
    })
}

const addReader = async (messageIds, userId) => {

    return await prisma.messages.updateMany({
        where: {
            id: { in: messageIds },
        },
        data: {
            readersIds: {
                push: userId,
            },
        },
    })
}
export {
    createNewMessage,
    getAllMessagesByChatId,
    addReader
}