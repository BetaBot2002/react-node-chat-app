import React, { useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { Tooltip, Button, Text, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
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

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
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
            <i class="fa-solid fa-magnifying-glass" style={{ color: Colors.theme_blue_gray }}></i>
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
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size={'sm'} cursor={'pointer'} name='Sinchan' src='pic' />
            </MenuButton>
          </Menu>
        </div>
      </Box>
    </>
  )
}

export default SideDrawer
