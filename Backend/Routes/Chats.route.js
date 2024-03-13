import express from 'express'
import { addTokenToRequest } from '../Middlewares/TokenCheckers.middleware.js'
import { verifyAccessToken } from '../Middlewares/TokenVerifiers.middleware.js'
import { getAllChatsByUser, getOrCreateSingleChat, newGroupChat } from '../Controllers/Chat.controller.js'
const chatRouter=express.Router()

chatRouter.route("/").post(addTokenToRequest,verifyAccessToken,getOrCreateSingleChat)
chatRouter.route("/").get(addTokenToRequest,verifyAccessToken,getAllChatsByUser)
chatRouter.route("/group").post(addTokenToRequest,verifyAccessToken,newGroupChat)

export{
    chatRouter
}
