import express from 'express'
import { addTokenToRequest } from '../Middlewares/TokenCheckers.middleware.js'
import { verifyAccessToken } from '../Middlewares/TokenVerifiers.middleware.js'
import { getAllChatsByUser, getOrCreateSingleChat, newGroupChat, renameGroupChat } from '../Controllers/Chat.controller.js'
const chatRouter=express.Router()

chatRouter.route("/").post(addTokenToRequest,verifyAccessToken,getOrCreateSingleChat)
chatRouter.route("/").get(addTokenToRequest,verifyAccessToken,getAllChatsByUser)
chatRouter.route("/group").post(addTokenToRequest,verifyAccessToken,newGroupChat)
chatRouter.route("/rename").put(addTokenToRequest,verifyAccessToken,renameGroupChat)

export{
    chatRouter
}
