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

export {
    createNewMessage
}