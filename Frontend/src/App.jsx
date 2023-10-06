import { useState } from 'react'
import './App.css'
import { Button, ChakraProvider } from '@chakra-ui/react'
function App() {

  return (
    <ChakraProvider>
      <h1>Hello World</h1>
      <Button colorScheme='blue'>Button</Button>
    </ChakraProvider>
  )
}

export default App
