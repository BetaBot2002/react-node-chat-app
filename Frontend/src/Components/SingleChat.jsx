import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender } from '../Utils/chat.helper'
import ProfileModal from './Miscellaneous/ProfileModal'
import { Colors } from '../Utils/CSS-Variables'
import UpdateGroupChatModal from './Miscellaneous/UpdateGroupChatModal'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState()

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
                        Chats
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
