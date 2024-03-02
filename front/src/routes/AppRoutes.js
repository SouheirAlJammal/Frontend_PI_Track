import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Register from '../pages/register/Register.js'
import SideBar from '../layout/sideBar/SideBar.js'
import AllValues from '../components/Values/AllValues.js'
import WithFooter from '../layout/WithFooter/WithFooter.js'
import Home from '../pages/Home/Home'
import Task from '../pages/userDashboard/Task/Task.js'
import UserOverview from '../pages/userDashboard/UserOverview/UserOverview.js'
import Plans from '../pages/userDashboard/Plan/Plans.js'
import SinglePlan from '../pages/userDashboard/Plan/SinglePlan.js'
import CalendarView from '../pages/userDashboard/Calendar/CalendarView.js'
import AcceptInvitation from '../components/Invitation/AcceptInvitation.js'
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<WithFooter />}>
          <Route path='/' element={<Home />} />  
        </Route>

        <Route path='/login' element={<Register />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/values' element={<AllValues />} />

        <Route path='/dashboard' element={<SideBar />}>
          <Route path='overView' element={<UserOverview />} />
          <Route path='tasks' element={<Task />}></Route>
          <Route path='plans' element={<Plans />}></Route>
          <Route path='plans/plan/:planId' element={<SinglePlan />}></Route>
          <Route path='calendar' element={< CalendarView />}></Route>
        </Route>

        <Route path='/invitation/accept/:planId/:invitationId' element={<AcceptInvitation />}></Route>

      </Routes>

    </div>
  )
}

export default AppRoutes