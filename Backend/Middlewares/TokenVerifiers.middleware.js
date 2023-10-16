import { verifyToken } from "../Helpers/jwt.auth.helper"

const verifyAccessToken=(req,res,next)=>{
    const token=req.token
    const payload=verifyToken(token,"ACCESS")

    if(!payload.status===200){
        res.status(404).send({
            message:payload.message
        })
    }else{
        const {email} = payload
        req.email=email
        console.log(email)
        next()
    }
}

export {
    verifyAccessToken
}