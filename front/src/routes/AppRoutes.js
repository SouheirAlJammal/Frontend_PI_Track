import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Register from '../pages/register/Register.js'
import BackGround from '../components/BackGround/BackGround.js'
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<BackGround/>} />
        <Route path='/login' element={<Register />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/dashboard' />
      </Routes>

    </div>
  )
}

export default AppRoutes