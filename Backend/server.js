import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { userRouter } from "./Routes/User.route.js"
import { errorRoute, notFound } from "./Middlewares/ErrorHandler.middleware.js"
import { chatRouter } from "./Routes/Chats.route.js"
import { messageRouter } from "./Routes/Message.route.js"
import { Server } from "socket.io"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/user", userRouter)
app.use("/chat", chatRouter)
app.use("/message", messageRouter)
app.use(notFound)
app.use(errorRoute)

const server = app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`)
})

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    },
});

io.on("connection",(socket)=>{
    console.log("Connected to socket");

    socket.on("setup",(userData)=>{
        socket.join(userData.id)
        socket.emit("connected")

        socket.on("join chat",(room)=>{
            socket.join(room)
            console.log("user joined: "+room)
        })

        socket.on("new message",(newMessageReceived)=>{
            console.log(newMessageReceived)
            var chat=newMessageReceived.chat

            if(!chat.users) return console.log("users not defined in chat")
            console.log(chat.users)

            chat.users.forEach(user => {
                if(user.id===newMessageReceived.sender.id) return
                socket.in(user.id).emit("message received",newMessageReceived)
            });
        })
    })
})


