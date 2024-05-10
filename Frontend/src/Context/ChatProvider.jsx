import { createContext, useContext, useEffect, useState } from 'react'
import { getRefreshToken } from '../Utils/jwt.helper'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState({id:localStorage.getItem("userId")})
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [latestMessagesByChatId, setLatestMessagesByChatId] = useState({})
    const [unreadMessagesByChatId, setUnreadMessagesByChatId] = useState({})


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
            return {}
        }
    }

    useEffect(() => {
        getUser()
            .then(result => {
            })
    }, [])

    return <ChatContext.Provider value={{ user, setUser, getUser,selectedChat, setSelectedChat,chats, setChats,latestMessagesByChatId, setLatestMessagesByChatId,unreadMessagesByChatId, setUnreadMessagesByChatId }}>{children}</ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext)
}


export default ChatProvider