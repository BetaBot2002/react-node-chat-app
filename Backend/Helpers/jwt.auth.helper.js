import jwt from 'jsonwebtoken'

const tokenExpiryTime=15

const signUser=(email)=>{
    const AccessToken=jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:tokenExpiryTime})
    const RefreshToken=jwt.sign({email:email},process.env.REFRESH_TOKEN_SECRET,{expiresIn:tokenExpiryTime})
    return {
        accessToken:AccessToken,
        refreshToken:RefreshToken
    }
}

export {
    signUser
}