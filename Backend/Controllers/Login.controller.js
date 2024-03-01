import { findSingleUser } from "../Database/Users.query";
import { signUser,newAccessToken, newAccessToken } from "../Helpers/jwt.auth.helper";

const login=async (req,res)=>{
    const {email,password} = req.body
    const user=await findSingleUser(email,password)

    if(!user){
        res.status(404).send({
            message:"USER_NOT_FOUND"
        })

    }else{
        const {accesstoken,refreshtoken}=signUser(email)
        res.status(200).send({
            accessToken:accesstoken,
            refreshToken:refreshtoken
        })
    }
}

const refresh=async (req,res)=>{
    const {email}=req
    const newAccessToken=newAccessToken(email)

    res.status(200).send({
        accessToken:newAccessToken
    })
}

export{
    login,
    refresh
}