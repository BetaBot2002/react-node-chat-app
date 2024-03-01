import { registerUser } from "../Database/Users.query.js";
import { CustomStatusCodes } from "../Utilities/CustomStatusCodes.js";

const register=async (req,res)=>{
    const {email,password}=req.body

    try {
        const user=await registerUser(email,password)
        res.status(CustomStatusCodes.SUCCESS).send(user)
    } catch (error) {
        res.status(CustomStatusCodes.USER_ALREADY_EXISTS).send({
            message:`USER_ALREADY_EXISTS:${email}`,
            code:CustomStatusCodes.USER_ALREADY_EXISTS
        })
    }
}

export {
    register
}