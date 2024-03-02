import { registerUser } from "../Database/Users.query.js";
import { CustomStatusCodes } from "../Utilities/CustomStatusCodes.js";

const register=async (req,res)=>{
    const {name,email,password}=req.body
    const pic=null

    try {
        const user=await registerUser(name,email,password,pic)
        res.status(CustomStatusCodes.SUCCESS).send(user)
    } catch (error) {
        res.status(CustomStatusCodes.USER_ALREADY_EXISTS).send({
            message:`USER_ALREADY_EXISTS:${email}`,
            code:CustomStatusCodes.USER_ALREADY_EXISTS
        })
    }
    // const user=await registerUser(name,email,password,pic)
    // res.status(CustomStatusCodes.SUCCESS).send(user)
}

export {
    register
}