import jwt from 'jsonwebtoken'
import { CustomStatusCodes } from '../Utilities/CustomStatusCodes.js'

const tokenExpiryTime = '15m'

const signUser = (email) => {
    const AccessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: tokenExpiryTime })
    const RefreshToken = jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET)
    return {
        accessToken: AccessToken,
        refreshToken: RefreshToken
    }
}

const verifyToken = (token, type) => {
    try {
        const decodedToken = type.toUpperCase() === "REFRESH" ? jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) : jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        return {
            "status":CustomStatusCodes.SUCCESS,
            "decoded":decodedToken
        }
    } catch (error) {
        return {
            "status":CustomStatusCodes.INVALID_TOKEN,
            "message":error.message
        }
    }
}

const newAccessToken=(email)=>{
    const AccessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: tokenExpiryTime })
    return {
        accessToken:AccessToken
    }
}

export {
    signUser,
    verifyToken,
    newAccessToken
}