import { Avatar, Box, Tooltip } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../Context/ChatProvider'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../Utils/chat.helper'

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState()
    return (
        <ScrollableFeed>
            {messages && messages.map((message, index) => (
                <Box display={"flex"} key={message.id}>
                    {
                        (isSameSender(messages, message, index, user.id) || isLastMessage(messages, index, user.id)) &&
                        (
                            <Tooltip
                                label={message.sender.name}
                                placement='bottom-start'
                                hasArrow
                            >
                                <Avatar
                                    mt="7px"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={message.sender.name}
                                    src={message.sender.profilePic}
                                />
                            </Tooltip>
                        )
                    }
                    <span
                        style={{
                            backgroundColor: `${message.sender.id === user.id ? "#BEE3F8" : "#B9F5D0"}`,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            marginLeft: isSameSenderMargin(messages, message, index, user.id),
                            marginTop: isSameUser(messages, message, index) ? 3 : 10
                        }}
                    >
                        {message.content}
                    </span>
                </Box>
            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat
