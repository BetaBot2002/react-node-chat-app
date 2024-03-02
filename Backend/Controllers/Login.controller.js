import { signUser, newAccessToken } from "../Helpers/jwt.auth.helper.js";
import { findSingleUser } from "../Database/Users.query.js";
import { CustomStatusCodes } from "../Utilities/CustomStatusCodes.js";
import { blacklistToken } from "../Database/BlackListedTokens.query.js";

const login=async (req,res)=>{
    const {email,password} = req.body
    const user=await findSingleUser(email,password)

    if(!user){
        res.status(CustomStatusCodes.USER_NOT_FOUND).send({
            message:"USER_NOT_FOUND",
            code:CustomStatusCodes.USER_NOT_FOUND
        })

    }else{
        const {accesstoken,refreshtoken}=signUser(email)
        res.status(CustomStatusCodes.SUCCESS).send({
            accessToken:accesstoken,
            refreshToken:refreshtoken,
            code:CustomStatusCodes.SUCCESS
        })
    }
}

const refresh=async (req,res)=>{
    const {email}=req
    const newaccesstoken= newAccessToken(email)

    res.status(CustomStatusCodes.SUCCESS).send({
        accessToken:newaccesstoken,
        code:CustomStatusCodes.SUCCESS
    })
}

const logout=async (req,res)=>{
    const token=req.token
    const blacklisted=await blacklistToken(token)

    res.status(CustomStatusCodes.SUCCESS).send({
        token:blacklisted,
        message:"TOKEN_DELETED",
        code:CustomStatusCodes.SUCCESS
    })
}

export{
    login,
    refresh,
    logout
}