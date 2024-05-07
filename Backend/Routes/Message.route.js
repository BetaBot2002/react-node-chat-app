import express from 'express'
import { addTokenToRequest } from '../Middlewares/TokenCheckers.middleware.js'
import { verifyAccessToken } from '../Middlewares/TokenVerifiers.middleware.js'
import { getAllMessages, readMessage, sendMessage } from '../Controllers/Message.controller.js'
const messageRouter=express.Router()

messageRouter.route("/").post(addTokenToRequest,verifyAccessToken,sendMessage)
messageRouter.route("/:chatId").get(addTokenToRequest,verifyAccessToken,getAllMessages)
messageRouter.route("/read").post(addTokenToRequest,verifyAccessToken,readMessage)

export{
    messageRouter
}