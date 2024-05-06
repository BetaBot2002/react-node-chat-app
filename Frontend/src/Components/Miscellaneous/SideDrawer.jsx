import React, { useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { Tooltip, Button, Text, Avatar, useToast, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, Spinner } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Colors } from '../../Utils/CSS-Variables'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'

import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '../../Utils/jwt.helper'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserComponents/UserListItem'


const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user, setUser,setSelectedChat,chats, setChats } = ChatState()
  const handleLogout = async () => {
    const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/logout`
    try {
      const response = await axios.post(api_url, {}, {
        headers: {
          "Content-type": "application/json",
          'Authorization': `bearer ${getRefreshToken()}`
        }
      })
      setAccessToken('')
      setRefreshToken('')
      setUser({})
      setSelectedChat("")
      setChats([])
      localStorage.removeItem("userId")

      navigate("/registration")
    } catch (error) {
      console.log(error)
      toast({
        title: `Something Went Wrong`,
        description: `Logout failed`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
    }
  }

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true)
      const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user?search=${search}`
      const config = {
        headers: {
          "Content-type": "application/json",
          'Authorization': `bearer ${await getAccessToken()}`
        }
      }
      const { data } = await axios.get(api_url, config)
      console.log(data)
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

  const accessChat=async (receiverEmail) => {
    console.log(receiverEmail);

    try {
      setLoadingChat(true);
      const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/chat`
      const config = {
        headers: {
          "Content-type": "application/json",
          'Authorization': `bearer ${await getAccessToken()}`
        }
      }
      const { data } = await axios.post(api_url, { receiverEmail }, config);

      if (!chats.find((c) => c.id === data.id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={Colors.theme_lavender}
        w={"100%"}
        p={"5px 15px 5px 15px"}
        borderWidth={"5px"}
        borderColor={Colors.theme_dark_lavender}
        borderRadius={"6px"}
      >
        <Tooltip hasArrow label='Search Users to Chat' placement='bottom-end'>
          <Button variant={"ghost"} onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass" style={{ color: Colors.theme_blue_gray }}></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>Search Users</Text>
          </Button>
        </Tooltip>
        <Text
          fontSize={"2xl"}
          fontFamily={"helvetica"}
          fontWeight={"extrabold"}
          color={Colors.theme_dark}
          px={'16px'}
          textAlign={'center'}
        >
          Chattery 🦆
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon boxSize={6} color={Colors.theme_dark} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} background={'transparent'} _hover={{ background: 'transparent' }}>
              <Avatar size={'sm'} cursor={'pointer'} name={user.name} src={user.profilePic} />
            </MenuButton>
            <MenuList backgroundColor={Colors.theme_dark} borderColor={Colors.theme_lavender}>
              <ProfileModal user={user}>
                <MenuItem backgroundColor={Colors.theme_dark}>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem backgroundColor={Colors.theme_dark} onClick={handleLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        placement='left'
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" flexDir={'row'} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading/>
            ) : (
              searchResults.map((user)=>(
                <UserListItem
                  key={user.id}
                  user={user}
                  handleClick={()=>{ accessChat(user.email)}}
                />
              ))
            )
            }

            {loadingChat && <Spinner ml={'auto'} display={'flex'}/>}
          </DrawerBody>
        </DrawerContent>

      </Drawer>
    </>
  )
}

export default SideDrawer
