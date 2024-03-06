import bcrypt from 'bcrypt'

const saltRounds=parseInt(process.env.ENCRYPTION_SALT)

const hashPassword=async (password)=>{
    try {
        const hashedPassword= await bcrypt.hash(password,saltRounds)
        return hashedPassword
    } catch (error) {
        throw new Error("Error in encryption.")
    }
}

const comparePasswords=async (password,hashedPassword)=>{
    try {
        const isMatched= await bcrypt.compare(password,hashedPassword)
        return isMatched
    } catch (error) {
        throw new Error("Error in comparison.")
    }
}

export{
    hashPassword,
    comparePasswords
}
