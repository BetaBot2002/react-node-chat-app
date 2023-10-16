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

const verifyRefreshToken=(req,res,next)=>{
    const token=req.token
    const isBlacklisted=false
    if(!isBlacklisted){
        const payload=verifyToken(token,"REFRESH")

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
    }else{
        res.status(404).send({
            message:`TOKEN EXPIRED`
        })
    }
}

export {
    verifyAccessToken,
    verifyRefreshToken
}