import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender } from '../Utils/chat.helper'
import ProfileModal from './Miscellaneous/ProfileModal'
import { Colors } from '../Utils/CSS-Variables'
import UpdateGroupChatModal from './Miscellaneous/UpdateGroupChatModal'
import { useState } from 'react'
import { getAccessToken } from '../Utils/jwt.helper'
import axios from 'axios'
import { useEffect } from 'react'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const { user, selectedChat, setSelectedChat } = ChatState()
    const toast = useToast()

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
            console.log(messages)
            setMessages(data)
            setLoading(false)
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

    useEffect(() => {
        fetchAllMessages()
    }, [selectedChat]);

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
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
                console.log(data)
                setMessages([...messages, data])
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
                                <div>
                                    Chats
                                </div>
                            )}

                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
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
