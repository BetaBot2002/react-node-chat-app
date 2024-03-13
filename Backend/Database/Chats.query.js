import { PrismaClient } from "@prisma/client";
import { generate12ByteHexString, stringsToJsonArray } from "../Helpers/UtilityFunctions.js";
const prisma = new PrismaClient()

const selectedUserFields={
    id: true,
    email: true,
    name: true,
    profilePic: true
}

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
                select: selectedUserFields
            },
            messages:{
                include:{
                    sender:{
                        select:selectedUserFields
                    }
                }
            }
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
                select: selectedUserFields
            },
            messages:{
                include:{
                    sender:{
                        select:selectedUserFields
                    }
                }
            }
        }
    })
}

const getAllChatsByUserId = async (userId) => {
    return await prisma.chats.findMany({
        where: {
            users: { some: { id: userId } }
        },
        include: {
            users: {
                select: selectedUserFields
            },
            admins: {
                select: selectedUserFields
            },
            messages:{
                include:{
                    sender:{
                        select:selectedUserFields
                    }
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })
}

const createGroupChat=async (name,users,admin)=>{
    return await prisma.chats.create({
        data:{
            chatName:name,
            isGroupChat:true,
            users:{
                connect:stringsToJsonArray(users,"id")
            },
            admins:{
                connect:[{id:admin}]
            }
        },
        include:{
            users:{
                select:selectedUserFields
            },
            admins:{
                select:selectedUserFields
            }
        }
    })
}

export {
    createChat,
    getAllChatsBySenderReceiver,
    getAllChatsByUserId,
    createGroupChat
}