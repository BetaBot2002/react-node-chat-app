import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import { Colors } from '../Utils/CSS-Variables'
import SingleChat from './SingleChat'

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const { selectedChat } = ChatState()

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg={Colors.theme_dark_lavender}
      color={Colors.theme_light}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} ></SingleChat>
    </Box>
  )
}

export default ChatBox
