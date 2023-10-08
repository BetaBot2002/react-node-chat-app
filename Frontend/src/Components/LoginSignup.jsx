import React from 'react'
import '../CSS/LoginSignup.css'
import { Colors } from '../Utils/CSS-Variables.js'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
const LoginSignup = () => {
  return (
    <Container maxW={'xl'} centerContent>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        bg={Colors.theme_light_grey}
        p={3}
        w={'100%'}
        m={'40px 0 15px 0'}
        borderRadius={'lg'}
        borderWidth={'2px'}
        borderColor={Colors.theme_lavender}
      >
        <Text
          fontSize={'4xl'}
          fontFamily={'Helvetica'}
          fontWeight={'bold'}
          letterSpacing={'2px'}
          color={Colors.theme_lavender}
        >Chattery 🦆</Text>
      </Box>
      <Box
        p={4}
        w={'100%'}
        borderRadius={'lg'}
        bg={Colors.theme_light_grey}
      >
        <Tabs isFitted variant={'soft-rounded'} colorScheme='purple'>
          <TabList mb='1em'>
            <Tab
              fontWeight={'bold'}
              fontSize={'20px'}
            >
              Log In
            </Tab>
            <Tab
              fontWeight={'bold'}
              fontSize={'20px'}
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default LoginSignup

