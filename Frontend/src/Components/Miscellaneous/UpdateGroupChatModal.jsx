import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserComponents/UserBadgeItem'
import axios from 'axios'
import { getAccessToken } from '../../Utils/jwt.helper'
import UserListItem from '../UserComponents/UserListItem'

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain,fetchAllMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, selectedChat, setSelectedChat, } = ChatState()

    const [groupChatName, setGroupChatName] = useState("")
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast()

    const handleAddUser = async (userToBeAdded) => {
        if (selectedChat.userIds.includes(userToBeAdded.id)) {
            toast({
                title: "User Already in group!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (!selectedChat.adminIds.includes(user.id)) {
            toast({
                title: "Only admins can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true)
            const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/chat/addtogroup`
            const config = {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `bearer ${await getAccessToken()}`
                }
            }
            const body = {
                chatid: selectedChat.id,
                userid: userToBeAdded.id
            }
            const { data } = await axios.put(api_url, body, config)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to add user to the group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setLoading(false)
        }
    }

    const handleRemove = async (userToBeRemoved) => {
        if (!selectedChat.adminIds.includes(user.id) && userToBeRemoved.id!==user.id) {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true)
            const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/chat/removefromgroup`
            const config = {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `bearer ${await getAccessToken()}`
                }
            }
            const body = {
                chatid: selectedChat.id,
                userid: userToBeRemoved.id
            }
            const { data } = await axios.put(api_url, body, config)
            userToBeRemoved.id===user.id? setSelectedChat():setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            fetchAllMessages()
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to remove user from the group"+error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setLoading(false)
        }
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
            const body = {
                chatid: selectedChat.id,
                newname: groupChatName
            }
            const { data } = await axios.put(api_url, body, config)
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

    const handleSearch = async (searchQuery) => {
        setSearch(searchQuery)
        if (!searchQuery) return;
        try {
            setLoading(true)
            const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user?search=${searchQuery}`
            const config = {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `bearer ${await getAccessToken()}`
                }
            }
            const { data } = await axios.get(api_url, config)
            setLoading(false)
            setSearchResults(data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
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
                                    admin={selectedChat.admins[0]}
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
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {loading ? (
                            <Spinner size="lg" />
                        ) : (
                            searchResults?.map((searchedUser) => (
                                <UserListItem
                                    key={searchedUser.id}
                                    user={searchedUser}
                                    handleClick={() => handleAddUser(searchedUser)}
                                />
                            ))
                        )}
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
