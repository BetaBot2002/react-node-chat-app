import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, flattenTokens, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender } from '../Utils/chat.helper'
import ProfileModal from './Miscellaneous/ProfileModal'
import { Colors } from '../Utils/CSS-Variables'
import UpdateGroupChatModal from './Miscellaneous/UpdateGroupChatModal'
import { useState } from 'react'
import { getAccessToken } from '../Utils/jwt.helper'
import axios from 'axios'
import { useEffect } from 'react'
import ScrollableChat from './ScrollableChat'
import io from 'socket.io-client'
import Lottie from 'react-lottie'
import animationData from "../assets/animations/typing.json";

const ENDPOINT = import.meta.env.VITE_APP_BACKEND_API
var socket, selectedChatCompare

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const { user, selectedChat, setSelectedChat, latestMessagesByChatId, setLatestMessagesByChatId, chats, unreadMessagesByChatId, setUnreadMessagesByChatId } = ChatState()
    const toast = useToast()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const fetchAllMessages = async () => {
        if (!selectedChat) return
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getAccessToken()}`,
                },
            };

            const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/message/${selectedChat.id}`

            setLoading(true)
            const { data } = await axios.get(api_url, config);
            setMessages(data)
            setLoading(false)
            socket.emit("join chat", selectedChat.id)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to fetch messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });

        }
    }

    const readAllMessages = async () => {
        if (!selectedChat) return
        if (!unreadMessagesByChatId[selectedChat.id] || !unreadMessagesByChatId[selectedChat.id].length) return
        let unreadMessagesString = JSON.stringify(unreadMessagesByChatId[selectedChat.id].map(msg=>{return msg.id}))
        console.log(unreadMessagesString)
        console.log(unreadMessagesByChatId)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getAccessToken()}`,
                },
            };

            const body = {
                messageIds: unreadMessagesString,
                userId: user.id
            }
            const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/message/read`
            const { data } = await axios.post(api_url, body, config);
            console.log("updatedChats ",data)
            setUnreadMessagesByChatId({
                ...unreadMessagesByChatId,
                [selectedChat.id]: []
            })
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to read messages"+error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    }

    
    const readSingleMessage=async (messageId)=>{
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getAccessToken()}`,
                },
            };

            const body = {
                messageIds: JSON.stringify([messageId]),
                userId: user.id
            }
            const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/message/read`
            const { data } = await axios.post(api_url, body, config);
            console.log("updatedChats ",data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to read messages"+error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    }

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user)
        socket.on("connected", () => {
            setSocketConnected(true)
        })

        socket.on("typing", () => {
            setIsTyping(true)
        })

        socket.on("stop typing", () => {
            setIsTyping(false)
        })
    }, [])

    useEffect(() => {
        fetchAllMessages()
        readAllMessages()
        selectedChatCompare = selectedChat
    }, [selectedChat]);

    useEffect(() => {
        readAllMessages()
    }, [fetchAgain]);

    useEffect(() => {
        socket.on("message received", async (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare.id !== newMessageReceived.chat.id) {
                // setUnreadMessagesByChatId({
                //     ...unreadMessagesByChatId,
                //     [newMessageReceived.chat.id]: [...(unreadMessagesByChatId[newMessageReceived.chat.id] || []), newMessageReceived]
                // })
            } else {
                setMessages([...messages, newMessageReceived])
                console.log(newMessageReceived.id)
                // await readSingleMessage(newMessageReceived.id)
            }
            setUnreadMessagesByChatId({
                ...unreadMessagesByChatId,
                [newMessageReceived.chat.id]: [...(unreadMessagesByChatId[newMessageReceived.chat.id] || []), newMessageReceived]
            })
            setLatestMessagesByChatId({
                ...latestMessagesByChatId,
                [newMessageReceived.chat.id]: newMessageReceived
            })
            setFetchAgain(!fetchAgain)
        })
    });


    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat.id)
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${await getAccessToken()}`,
                    },
                };

                const body = {
                    content: newMessage,
                    chatId: selectedChat.id
                }

                const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/message`
                setNewMessage("")

                const { data } = await axios.post(api_url, body, config);
                socket.emit("new message", data)
                setMessages([...messages, data])
                setLatestMessagesByChatId({
                    ...latestMessagesByChatId,
                    [selectedChat.id]: data
                })
                // await readSingleMessage(data.id)
                setFetchAgain(!fetchAgain)
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });

            }
        }
    }


    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        if (!socketConnected) {
            console.log("Socket not connected")
            return
        }
        if (!typing) {
            setTyping(true)
            socket.emit("typing", selectedChat.id)
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat.id);
                setTyping(false);
            }
        }, timerLength);

    }


    return (
        <>
            {selectedChat ?
                (<>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Helvetica"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />

                        {!selectedChat.isGroupChat ?
                            (<>
                                {getSender(user, selectedChat.users).name}
                                <ProfileModal user={getSender(user, selectedChat.users)} />
                            </>) :
                            (<>{selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                    fetchAllMessages={fetchAllMessages}
                                />
                            </>)
                        }
                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg={Colors.theme_lavender}
                        color={Colors.theme_dark}
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ?
                            (<Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />)
                            : (
                                <Box
                                    display={"flex"}
                                    flexDir={"column"}
                                    overflowY={"scroll"}
                                    style={{ scrollbarWidth: 'none' }}
                                >
                                    <ScrollableChat messages={messages} />
                                </Box>
                            )}

                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            {isTyping ? <div>
                                <Lottie options={defaultOptions}
                                    width={70}
                                    style={{ marginBottom: 15, marginLeft: 0 }}
                                />
                            </div> : <></>}
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
                    </Box>
                </>) :
                (<Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Helvetica" fontWeight={"bold"}>
                        Click on a user to start chatting
                    </Text>
                </Box>)
            }
        </>
    )
}

export default SingleChat
