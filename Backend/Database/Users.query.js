import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()

const registerUser= async (name,email,password)=>{
    return await prisma.users.create({
        data:{
            name:name,
            email:email,
            password:password,
            isAdmin:false
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

export {
    registerUser,
    findSingleUser
}