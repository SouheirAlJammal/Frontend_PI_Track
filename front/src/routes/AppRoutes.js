import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Register from '../pages/register/Register.js'
import Hero from '../components/HerSection/Hero.js'
import SideBar from '../layout/sideBar/SideBar.js'
import AllValues from '../components/Values/AllValues.js'
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/login' element={<Register />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/values' element={<AllValues />} />

        <Route path='/dashboard' element={<SideBar />}>
          <Route path='overView' element={<AllValues />} />

        </Route>
      </Routes>

    </div>
  )
}

export default AppRoutes