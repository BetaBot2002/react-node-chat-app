import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const createChat = async (senderId, receiverId) => {
    return await prisma.chats.create({
        data: {
            chatName: "sender",
            users: {
                connect: [
                    { id: senderId },
                    { id: receiverId }
                ]
            },
            isGroupChat: false
        },
        include: {
            users: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    profilePic: true
                }
            },
            lastMessage: {
                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            profilePic: true,
                        },
                    },
                },
            },
        }
    })
}

const getAllChatsBySenderReceiver = async (senderId, receiverId) => {
    return await prisma.chats.findMany({
        where: {
            isGroupChat: false,
            AND: [
                { users: { some: { id: senderId } } },
                { users: { some: { id: receiverId } } }
            ]
        },
        include: {
            users: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    profilePic: true
                }
            },
            lastMessage: {
                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            profilePic: true,
                        },
                    },
                },
            },
        }
    })
}

export {
    createChat,
    getAllChatsBySenderReceiver
}