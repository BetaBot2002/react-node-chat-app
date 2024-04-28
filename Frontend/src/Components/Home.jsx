import React from 'react'
import { useState } from 'react'
import { Box } from '@chakra-ui/layout'
import SideDrawer from './Miscellaneous/SideDrawer'
import MyChats from './MyChats'
import ChatBox from './ChatBox'
import { ChatState } from '../Context/ChatProvider'

const Home = () => {
  const {user}=ChatState()
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <>
      <SideDrawer/>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        w={'100%'}
        h={'91.5vh'}
        padding={'10px'}
      >
          <MyChats fetchAgain={fetchAgain} />
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
      </Box>
    </>
  )
}

export default Home
