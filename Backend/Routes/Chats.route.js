import express from 'express'
import { addTokenToRequest } from '../Middlewares/TokenCheckers.middleware.js'
import { verifyAccessToken } from '../Middlewares/TokenVerifiers.middleware.js'
import { getOrCreateSingleChat } from '../Controllers/Chat.controller.js'
const chatRouter=express.Router()

chatRouter.route("/").get(addTokenToRequest,verifyAccessToken,getOrCreateSingleChat)

export{
    chatRouter
}
