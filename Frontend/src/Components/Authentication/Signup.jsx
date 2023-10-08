import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {
  const [isShown, setIsShown] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  return (
    <VStack spacing={'15px'}>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={isShown?'text':'password'}
            placeholder='Enter Your Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w={'80px'}>
            <Button
              variant={'unstyled'}
              onClick={()=>{
                setIsShown(!isShown)
              }}
            >
              {isShown ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

      </FormControl>
    </VStack>
  )
}

export default Signup
