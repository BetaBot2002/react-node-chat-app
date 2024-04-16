import React, { useEffect } from 'react'
import { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import { getAccessToken } from '../Utils/jwt.helper'
import axios from 'axios'
import { Colors } from '../Utils/CSS-Variables'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from './ChatLoading'
import { getSender } from '../Utils/chat.helper'
import GroupChatModal from './Miscellaneous/GroupChatModal'

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState()
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()

  const toast = useToast()

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      };

      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API}/chat`, config);
      console.log(data)
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(user)
    fetchChats()
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg={Colors.theme_dark_lavender}
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={Colors.theme_dark}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Helvetica"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color={Colors.theme_light}
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg={Colors.theme_lavender}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {
          chats ? (
            <Stack overflowY={"scroll"}>
              {
                chats.map((chat) => (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? Colors.theme_dark_lavender : Colors.theme_light}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat.id}
                  >
                    <Text>
                      {
                        !chat.isGroupChat
                          ? (
                            getSender(loggedUser, chat.users)
                          )
                          : chat.chatName
                      }
                    </Text>

                  </Box>
                ))
              }
            </Stack>
          ) : (
            <ChatLoading></ChatLoading>
          )
        }
      </Box>
    </Box>
  )
}

export default MyChats
