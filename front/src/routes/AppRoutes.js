import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Register from '../pages/register/Register.js'
import SideBar from '../layout/sideBar/SideBar.js'
import AllValues from '../components/Values/AllValues.js'
import WithFooter from '../layout/WithFooter/WithFooter.js'
import Home from '../pages/Home/Home'
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route  element={<WithFooter />}> 
          <Route path='/' element={<Home />} />
          </Route>
       
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