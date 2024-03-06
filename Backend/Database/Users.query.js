import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()

const registerUser= async (name,email,password,pic)=>{
    return await prisma.users.create({
        data:{
            name:name,
            email:email,
            password:password,
            isAdmin:false,
            ...(pic && { profilePic: pic })
        }
    })
}

const findSingleUser= async (email,password)=>{
    return await prisma.users.findUnique({
        where:{
            email:email,
            password:password
        }
    })
}

const findSingleUserByEmail= async (email)=>{
    return await prisma.users.findUnique({
        where:{
            email:email
        }
    })
}

export {
    registerUser,
    findSingleUser,
    findSingleUserByEmail
}