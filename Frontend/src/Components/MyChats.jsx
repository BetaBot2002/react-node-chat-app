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

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats, latestMessagesByChatId, setLatestMessagesByChatId, unreadMessagesByChatId, setUnreadMessagesByChatId } = ChatState()
  const [chatLoading, setChatLoading] = useState();
  const [firstFetch, setFirstFetch] = useState(true);
  let latestMessages = {}
  let unreadMessages = {}
  const toast = useToast()

  const comparator = (a, b) => {
    // Get the creation time of the latest message of each object
    const aTime = a.latestMessage ? new Date(a.latestMessage.createdAt).getTime() : new Date(a.createdAt).getTime();
    const bTime = b.latestMessage ? new Date(b.latestMessage.createdAt).getTime() : new Date(b.createdAt).getTime();

    // Compare the creation time
    return bTime-aTime;
};

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      };
      setChatLoading(firstFetch)
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API}/chat`, config);
      data.sort(comparator)
      setChatLoading(false)
      setFirstFetch(false)
      data.forEach(chat => {
        if (chat.latestMessage) {
          latestMessages[chat.id] = chat.latestMessage //We Cannot directly use setLatestMessagesByChatId() inside forEach as the state does not updates immediately
        }
      });
      setLatestMessagesByChatId(latestMessages)
      setChats(data);
      data.forEach(chat => {
        unreadMessages[chat.id] = chat.messages.filter(msg => {
          return !msg.readersIds.includes(user.id)
        })
      })
      setUnreadMessagesByChatId(unreadMessages)
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats" + error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats()
  }, [fetchAgain]);

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
          chats.length ? (
            <Stack overflowY={"scroll"}>
              {
                chats.map((chat) => (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat?.id === chat.id ? Colors.theme_dark_lavender : Colors.theme_light}
                    color={selectedChat?.id === chat.id ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat.id}
                  >
                    <Box display={"flex"} flexDir={"row"} justifyContent={"space-between"}>
                      <Text fontWeight={"bold"}>
                        {
                          !chat.isGroupChat
                            ? (
                              getSender(user, chat.users).name
                            )
                            : chat.chatName
                        }
                      </Text>
                      <Box>
                        <Text color={Colors.theme_bold_red} fontWeight={"semibold"} fontSize={15}>
                          {unreadMessagesByChatId[chat.id]?.length?unreadMessagesByChatId[chat.id]?.length:""}
                        </Text>
                      </Box>
                    </Box>
                    <Box fontSize={16} display={"flex"} flexDir={"row"}>
                      {chat.isGroupChat &&
                        <Text
                          fontWeight={'semibold'}
                          marginRight={1}
                        >
                          {latestMessagesByChatId[chat.id]?.sender.id === user.id ?
                            "You" :
                            latestMessagesByChatId[chat.id]?.sender.name}
                          {latestMessagesByChatId[chat.id] && ":"}
                        </Text>
                      }
                      <Text noOfLines={2}>
                        {latestMessagesByChatId[chat.id]?.content}
                      </Text>
                    </Box>
                  </Box>
                ))
              }
            </Stack>
          ) :chatLoading?<></> :(
            <Box display={"flex"} flexDir={"column"}>
              <Text color={Colors.theme_dark} fontFamily={"helvetica"} fontWeight={"bold"} fontSize={25}>
                No Chats Yet
              </Text>
              <Text color={Colors.theme_dark} fontWeight={"semibold"}>
                Search for a user or Create a new group
              </Text>
            </Box>
          )
        }
        {chatLoading && <ChatLoading></ChatLoading>}
      </Box>
    </Box>
  )
}

export default MyChats
