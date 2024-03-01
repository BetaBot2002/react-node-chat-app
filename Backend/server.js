import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { userRouter } from "./Routes/User.route.js"

dotenv.config()

const app=express()

const PORT= process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/user",userRouter)

app.listen(PORT,()=>{
    console.log(`http://127.0.0.1:${PORT}`)
})
