import React, { useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { Tooltip, Button, Text, Avatar, useToast } from '@chakra-ui/react'
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
import { getRefreshToken, setAccessToken, setRefreshToken } from '../../Utils/jwt.helper'


const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const navigate = useNavigate()
  const toast = useToast()

  const { user, setUser } = ChatState()
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

      navigate("/registration")
    } catch (error) {
      console.log(error)
      toast({
        title: `User not found.`,
        description: `Wrong email or password.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom"
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
          <Button variant={"ghost"}>
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
    </>
  )
}

export default SideDrawer
