import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from '../components/Login/Login.js'
import Signup from '../components/Signup/Signup.js'
import BackGround from '../components/BackGround/BackGround.js'
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<BackGround/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' />
      </Routes>

    </div>
  )
}

export default AppRoutes