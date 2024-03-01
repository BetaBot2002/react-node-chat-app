import { findSingleUser } from "../Database/Users.query";
import { signUser,newAccessToken } from "../Helpers/jwt.auth.helper";

const login=async (req,res,next)=>{
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

export{
    login
}