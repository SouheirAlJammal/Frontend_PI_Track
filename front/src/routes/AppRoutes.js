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
import UserProfile from '../components/UserProfile/UserProfile.js'
import ProtectedRoute from './protectedRoutes.js'
import { useUserStore } from '../Store.js'
const AppRoutes = () => {

  const { user } = useUserStore()
  return (
    <div>
      <Routes>
        <Route element={<WithFooter />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route path='/logIn' element={<Register />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/values' element={<AllValues />} />

        <Route path='/dashboard' element={
          <ProtectedRoute isAllowed={user} redirectPath="/logIn">

            <SideBar />
          </ProtectedRoute>
        }>
          <Route path='overView' element={
            <ProtectedRoute isAllowed={user} redirectPath="/logIn">
              <UserOverview />
            </ProtectedRoute>

          } />
          <Route path='tasks' element={
            <ProtectedRoute isAllowed={user} redirectPath="/logIn">

              <Task />
            </ProtectedRoute>

          }></Route>
          <Route path='plans' element={
            <ProtectedRoute isAllowed={user} redirectPath="/logIn">

              <Plans />
            </ProtectedRoute>

          }></Route>
          <Route path='plans/plan/:planId' element={
            <ProtectedRoute isAllowed={user} redirectPath="/logIn">

              <SinglePlan />
            </ProtectedRoute>

          }></Route>
          <Route path='calendar' element={

            <ProtectedRoute isAllowed={user} redirectPath="/logIn">

              < CalendarView />
            </ProtectedRoute>

          }></Route>
          <Route path='profile' element={
            <ProtectedRoute isAllowed={user} redirectPath="/logIn">

              <UserProfile />
            </ProtectedRoute>

          }></Route>
        </Route>

        <Route path='/invitation/accept/:planId/:invitationId' element={
          <ProtectedRoute isAllowed={user} redirectPath="/logIn">
            <AcceptInvitation />
          </ProtectedRoute>
        }></Route>

      </Routes>

    </div>
  )
}

export default AppRoutes