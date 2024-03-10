import express from 'express'
import { addTokenToRequest } from '../Middlewares/TokenCheckers.middleware.js'
import { verifyAccessToken } from '../Middlewares/TokenVerifiers.middleware.js'
import { getAllChatsByUser, getOrCreateSingleChat } from '../Controllers/Chat.controller.js'
const chatRouter=express.Router()

chatRouter.route("/").post(addTokenToRequest,verifyAccessToken,getOrCreateSingleChat)
chatRouter.route("/").get(addTokenToRequest,verifyAccessToken,getAllChatsByUser)

export{
    chatRouter
}
