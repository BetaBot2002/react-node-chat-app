import React, { useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { Tooltip, Button, Text } from '@chakra-ui/react'
import { Colors } from '../../Utils/CSS-Variables'

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
        p={"5px 10px 5px 10px"}
        borderWidth={"5px"}
        borderColor={Colors.theme_dark_lavender}
        borderRadius={"6px"}
      >
        <Tooltip hasArrow label='Search Users' placement='bottom-end'>
          <Button variant={"ghost"}>
            <i class="fa-solid fa-magnifying-glass" style={{ color: Colors.theme_blue_gray }}></i>
            <Text d={{base:"none", md:"flex"}} px={4}>Search Users</Text>
          </Button>
        </Tooltip>
      </Box>
    </>
  )
}

export default SideDrawer
