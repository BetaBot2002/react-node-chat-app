import express from 'express'
import { addTokenToRequest } from '../Middlewares/TokenCheckers.middleware.js'
import { verifyAccessToken } from '../Middlewares/TokenVerifiers.middleware.js'
import { getAllMessages, sendMessage } from '../Controllers/Message.controller.js'
const messageRouter=express.Router()

messageRouter.route("/").post(addTokenToRequest,verifyAccessToken,sendMessage)
messageRouter.route("/:chatId").get(addTokenToRequest,verifyAccessToken,getAllMessages)

export{
    messageRouter
}