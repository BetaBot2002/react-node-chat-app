import React, { useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { Tooltip,Button } from '@chakra-ui/react'

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  return (
    <>
      <Box>
        <Tooltip hasArrow label='Search Users' placement='bottom-end'>
          <Button variant={"ghost"}><i class="fa-solid fa-magnifying-glass"></i></Button>
        </Tooltip>
      </Box>
    </>
  )
}

export default SideDrawer
