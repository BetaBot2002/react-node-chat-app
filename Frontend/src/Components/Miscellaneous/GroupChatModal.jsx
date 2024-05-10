import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Colors } from '../../Utils/CSS-Variables'
import { getAccessToken } from '../../Utils/jwt.helper'
import axios from 'axios'
import UserListItem from '../UserComponents/UserListItem'
import UserBadgeItem from '../UserComponents/UserBadgeItem'

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const { user, chats, setChats } = ChatState()

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

    const addToSelectedUsers = (user) => {
        if (selectedUsers.includes(user)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, user]);
        setSearchResults(searchResults.filter(searchedUser => user.id !== searchedUser.id))
    }

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/chat/group`
            const body = {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u.id)),
            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `bearer ${await getAccessToken()}`
                }
            }
            const { data } = await axios.post(api_url, body, config)
            setChats([data, ...chats])
            onClose();
            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to create group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    const handleDelete = (user) => {
        setSelectedUsers(selectedUsers.filter(selectedUser => user.id !== selectedUser.id))
        setSearchResults([...searchResults, user]);
    }
    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize={'25px'}
                        fontFamily={'Helvetica'}
                        fontWeight={"bold"}
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        flexDir={"column"}
                        alignItems={"center"}
                        gap={"4px"}
                    >
                        <FormControl >
                            <Input
                                placeholder='Enter Chat Name'
                                onChange={(e) => { setGroupChatName(e.target.value) }}
                                value={groupChatName}
                            />
                        </FormControl>
                        <FormControl >
                            <Input
                                placeholder='Add users'
                                onChange={(e) => { handleSearch(e.target.value) }}
                                value={search}
                            />
                        </FormControl>
                        <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUsers.map((selectedUser) => (
                                <UserBadgeItem
                                    key={selectedUser.id}
                                    user={selectedUser}
                                    handleDelete={() => handleDelete(selectedUser)}
                                    admin={user}
                                />
                            ))}
                        </Box>
                        {loading && <Spinner m={'auto'} display={'flex'} />}
                        {!loading && searchResults.slice(0, 4).map(user => (
                            <UserListItem key={user.id} user={user} handleClick={() => { addToSelectedUsers(user) }} />
                        ))}

                    </ModalBody>
                    <ModalFooter>
                        <Button bg={Colors.theme_dark_lavender} color={Colors.theme_light} mr={3} onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal
