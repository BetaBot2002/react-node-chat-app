import {PrismaClient} from "@prisma/client"
const prisma=new PrismaClient()

const isBlacklisted=async (token)=>{
    const blackListedToken=await prisma.blackListedTokens.findUnique({
        where:{
            token:token
        }
    })
    return !(blackListedToken===null)
}

export {
    isBlacklisted
}