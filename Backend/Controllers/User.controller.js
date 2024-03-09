import { searchUsersByEmailOrName } from "../Database/Users.query.js"

const searchUsers=async (req,res)=>{
    const {search}=req.query
    const {email}=req
    const found=await searchUsersByEmailOrName(search,email)
    const result= search? found:[]
    res.status(200).send(result)

}

export{
    searchUsers
}