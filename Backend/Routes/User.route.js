import express from 'express'
import { register } from '../Controllers/Registration.controller.js'
import { login, refresh } from '../Controllers/Login.controller.js'
import { addTokenToRequest } from '../Middlewares/TokenCheckers.middleware.js'
import { verifyRefreshToken } from '../Middlewares/TokenVerifiers.middleware.js'
const userRouter=express.Router()

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/refresh").get(addTokenToRequest,verifyRefreshToken,refresh)

export{
    userRouter
}