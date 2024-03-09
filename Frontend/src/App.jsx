import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import LoginSignup from './Components/LoginSignup'
import React from 'react'
import LogInLock from './Components/Guard/LogInLock'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LogInLock needLoggedIn={true}><Home /></LogInLock>} />
        <Route path='/registration' element={<LogInLock needLoggedIn={false}><LoginSignup /></LogInLock>} />
      </Routes>
    </div>
  )
}

export default App