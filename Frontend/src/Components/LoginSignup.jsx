import React from 'react'
import '../CSS/LoginSignup.css'
import {Colors} from '../Utils/CSS-Variables.js'
import { Box, Container, Text } from '@chakra-ui/react'
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
        >Chattery</Text>
      </Box>
    </Container>
  )
}

export default LoginSignup

