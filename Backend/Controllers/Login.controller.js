import { signUser, newAccessToken } from "../Helpers/jwt.auth.helper.js";
import { findSingleUser } from "../Database/Users.query.js";
import { CustomStatusCodes } from "../Utilities/CustomStatusCodes.js";

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

export{
    login,
    refresh
}