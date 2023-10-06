import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import LoginSignup from './Components/LoginSignup'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/registration' element={<LoginSignup />}/>
    </Routes>
  )
}

export default App
