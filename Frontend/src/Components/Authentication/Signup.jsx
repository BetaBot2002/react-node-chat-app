import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Colors } from '../../Utils/CSS-Variables'

const Signup = () => {
  const [isShown, setIsShown] = useState(false)
  const [isConfirmShown, setIsConfirmShown] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const picUpload = (image) => {

  }

  return (
    <VStack spacing={'15px'}>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
          borderColor={Colors.theme_lavender}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={isShown ? 'text' : 'password'}
            placeholder='Enter Your Password'
            onChange={(e) => {
              setPassword(e.target.value)
              setIsConfirmed(confirmPassword === e.target.value)
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

      <FormControl id='confirm-password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={isConfirmShown ? 'text' : 'password'}
            placeholder='Confirm Your Password'
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setIsConfirmed(password === e.target.value)
            }}
            borderColor={isConfirmed ? Colors.theme_light_green : Colors.theme_bold_red}
            focusBorderColor={isConfirmed ? Colors.theme_light_green : Colors.theme_bold_red}
            _hover={{
              borderColor: isConfirmed ? Colors.theme_light_green : Colors.theme_bold_red
            }}
          />
          <InputRightElement w={'80px'}>
            <Button
              variant={'unstyled'}
              onClick={() => {
                setIsConfirmShown(!isConfirmShown)
              }}
            >
              {isConfirmShown ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text
          fontSize={'14px'}
          color={Colors.theme_bold_red}
          align={'right'}
          m={'3px'}
        >
          {confirmPassword === '' || isConfirmed ? '' : 'Must be same as password'}
        </Text>
      </FormControl>
      <FormControl id='picture'>
        <FormLabel>Upload Profile Picture</FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e) => { picUpload(e.target.files[0]) }}
          border={'none'}
        />
      </FormControl>
    </VStack>
  )
}

export default Signup
