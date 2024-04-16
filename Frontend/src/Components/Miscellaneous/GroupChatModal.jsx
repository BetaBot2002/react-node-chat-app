import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Colors } from '../../Utils/CSS-Variables'

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const toast = useToast()
    const { users, chats, setChats } = ChatState()

    const handleSearch = (searchQuery) => {
        setSearch(searchQuery)
        if(!searchQuery) return;
        try {
            
        } catch (error) {
            
        }
    }

    const handleSubmit = (value) => {

    }
    return (
        <>
            <Button onClick={onOpen}>{children}</Button>

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
                            />
                        </FormControl>
                        <FormControl >
                            <Input
                                placeholder='Add users'
                                onChange={(e) => { handleSearch(e.target.value) }}
                            />
                        </FormControl>
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
