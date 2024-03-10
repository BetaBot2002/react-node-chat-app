import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const registerUser = async (name, email, password, pic) => {
    return await prisma.users.create({
        data: {
            name: name,
            email: email,
            password: password,
            isAdmin: false,
            ...(pic && { profilePic: pic })
        }
    })
}

const findSingleUser = async (email, password) => {
    return await prisma.users.findUnique({
        where: {
            email: email,
            password: password
        }
    })
}

const findSingleUserByEmail = async (email) => {
    return await prisma.users.findUnique({
        where: {
            email: email
        }
    })
}

const findSingleUserIdByEmail = async (email) => {
    return await prisma.users.findUnique({
        where: {
            email: email
        },
        select:{
            id:true
        }
    })
}

const searchUsersByEmailOrName = async (search, current_user_mail) => {
    return await prisma.users.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { name: { contains: search } },
                        { email: { contains: search } }
                    ]
                },
                {
                    NOT: {
                        email: current_user_mail
                    }
                }
            ]
        }
    })
}

export {
    registerUser,
    findSingleUser,
    findSingleUserByEmail,
    searchUsersByEmailOrName,
    findSingleUserIdByEmail
}