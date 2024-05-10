import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, Toast, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Colors } from '../../Utils/CSS-Variables'
import axios from 'axios'

const Signup = () => {
  const [isShown, setIsShown] = useState(false)
  const [isConfirmShown, setIsConfirmShown] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [email, setEmail] = useState()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const picUpload = (image) => {
    setLoading(true)
    if (image === undefined) {
      toast({
        title: 'Select an image',
        description: "No image is selected.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false)
      return
    }

    if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
      toast({
        title: 'Wrong file format.',
        description: `Only JPEG and PNG images are allowed. ${image.type}`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false)
      return
    }

    const formData = new FormData()
    const upload_preset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
    const cloud_name = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
    const api_base_url_image = import.meta.env.VITE_APP_CLOUDINARY_API_BASE_URL_IMAGE

    formData.append("file", image)
    formData.append("upload_preset", upload_preset)
    formData.append("cloud_name", cloud_name)
    fetch(api_base_url_image, {
      method: "post",
      body: formData
    }).then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url.toString())
        setLoading(false)
      }).catch((err) => {
        setLoading(false)
      })
  }

  const submitHandler = async () => {
    const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/register`
    const data = {
      name: name,
      email: email,
      password: password,
      image: imageUrl
    }

    try {
      const response = await axios.post(api_url, data, {
        headers: {
          "Content-type": "application/json",
        }
      })

      toast({
        title: 'User Registered',
        description: `User Registered with email: ${response.data.email}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      navigate("/")
    } catch (error) {
      toast({
        title: 'User Alredy Exists',
        description: `'User Alredy Exists with email: ${data.email}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
    }
  }

  return (
    <VStack spacing={'15px'}>
      <FormControl id='name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter Your Name'
          onChange={(e) => setName(e.target.value)}
          borderColor={Colors.theme_lavender}
        />
      </FormControl>
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
            borderColor={isConfirmed && confirmPassword ? Colors.theme_light_green : Colors.theme_bold_red}
            focusBorderColor={isConfirmed && confirmPassword ? Colors.theme_light_green : Colors.theme_bold_red}
            _hover={{
              borderColor: isConfirmed && confirmPassword ? Colors.theme_light_green : Colors.theme_bold_red
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
          {!confirmPassword || isConfirmed ? '' : 'Must be same as password'}
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

      <Button
        w={'100%'}
        colorScheme='purple'
        marginTop={'15px'}
        onClick={submitHandler}
        isLoading={loading}
        isDisabled={!email || !password || !confirmPassword || !name || !isConfirmed}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup
