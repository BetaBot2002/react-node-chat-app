import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import { Colors } from '../../Utils/CSS-Variables'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { setAccessToken, setRefreshToken } from '../../Utils/jwt.helper'
import { ChatState } from '../../Context/ChatProvider'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShown, setIsShown] = useState(false)
  const {getUser,setUser}=ChatState()
  const toast=useToast()
  const navigate=useNavigate()
  const submitHandler = async () => {
    const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/login`
    const data = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(api_url, data, {
        headers: {
          "Content-type": "application/json",
        }
      })
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      localStorage.setItem("userId",response.data.userId)
      setUser({id:response.data.userId})
      getUser()
      
      navigate("/")
    } catch (error) {
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
    <VStack spacing={'15px'}>
      <FormControl id='login-email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
          borderColor={Colors.theme_lavender}
        />
      </FormControl>
      <FormControl id='login-password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={isShown ? 'text' : 'password'}
            placeholder='Enter Your Password'
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            borderColor={Colors.theme_lavender}
          />
          <InputRightElement w={'80px'}>
            <Button
              variant={'unstyled'}
              onClick={() => {
                setIsShown(!isShown)
              }}
            >
              {isShown ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        w={'100%'}
        colorScheme='purple'
        marginTop={'15px'}
        onClick={submitHandler}
        isDisabled={!email || !password}
      >
        Log In
      </Button>
    </VStack>
  )
}

export default Login
