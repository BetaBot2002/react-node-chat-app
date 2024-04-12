import React from 'react'
import { useDisclosure, IconButton, Button, Image , Text} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Colors } from '../../Utils/CSS-Variables'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {
                children ? (<span onClick={onOpen}>{children}</span>) : (
                    <IconButton
                        d={{ base: 'flex' }}
                        icon={<ViewIcon />}
                        onClick={onOpen}
                    />
                )
            }
            <Modal isOpen={isOpen} onClose={onClose} size={'lg'} isCentered>
                <ModalOverlay />
                <ModalContent
                    width={"400px"}
                    height={"300px"}
                    backgroundColor={Colors.theme_lavender}
                >
                    <ModalHeader
                        fontSize={"40px"}
                        fontFamily={"Helvetica"}
                        display={"flex"}
                        justifyContent={"center"}
                        textAlign={"center"}
                        fontWeight={"light"}
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={'flex'}
                        flexDir={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Image
                            borderRadius="full"
                            boxSize="150px"
                            src={user.profilePic}
                            alt={user.name}
                        />
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            fontFamily="Work sans"
                        >
                            Email: {user.email}
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal
