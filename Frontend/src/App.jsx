import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import LoginSignup from './Components/LoginSignup'
import React from 'react'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registration' element={<LoginSignup />} />
      </Routes>
    </div>
  )
}

export default App