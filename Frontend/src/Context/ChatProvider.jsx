import { createContext, useContext, useEffect, useState } from 'react'
import { getRefreshToken } from '../Utils/jwt.helper'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const getUser = async () => {
        const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/getlogged`
        try {
            const response = await fetch(api_url, {
                method: "post",
                headers: {
                    'Authorization': `bearer ${getRefreshToken()}`
                }

            })
            const user = await response.json()
            setUser(user)
            return user
        } catch (error) {
            console.log(error)
            return {}
        }
    }

    useEffect(() => {
        getUser()
        .then(result => {
            console.log(result);
        })
    }, [localStorage.getItem('refresh')])

    return <ChatContext.Provider value={{ user, setUser }}>{children}</ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext)
}


export default ChatProvider