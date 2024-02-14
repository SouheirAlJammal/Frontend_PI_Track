import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from '../components/Login/Login.js'
import Signup from '../components/Signup/Signup.js'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' />
      </Routes>

    </div>
  )
}

export default AppRoutes