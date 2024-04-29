import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserComponents/UserBadgeItem'
import axios from 'axios'
import { getAccessToken } from '../../Utils/jwt.helper'

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, selectedChat, setSelectedChat, } = ChatState()

    const [groupChatName, setGroupChatName] = useState("")
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast()

    const handleRemove = (user) => {

    }
    const handleRename = async () => {
        if (!groupChatName) return
        try {
            setRenameLoading(true)
            const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/chat/rename`
            const config = {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `bearer ${await getAccessToken()}`
                }
            }
            const body={
                chatid:selectedChat.id,
                newname:groupChatName
            }
            const { data } = await axios.put(api_url, body, config)
            console.log(data)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to rename the group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setRenameLoading(false)
        }
        setGroupChatName("")
    }
    const handleSearch = (value) => {

    }

    return (
        <>
            <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Helvetica"
                        display="flex"
                        justifyContent="center"
                    >
                        {selectedChat.chatName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            {selectedChat.users.map((selectedUser) => (
                                <UserBadgeItem
                                    key={selectedUser.id}
                                    user={selectedUser}
                                    handleDelete={() => handleRemove(selectedUser)}
                                    admin={user}
                                />
                            ))}
                        </Box>
                        <FormControl display="flex">
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Rename
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add User to group"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => handleRemove(user)} colorScheme="red">
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal
