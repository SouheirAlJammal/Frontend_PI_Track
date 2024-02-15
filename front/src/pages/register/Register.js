import React from 'react'
import sally from '../../assets/Saly-1.png'
import Login from '../../components/Login/Login'
import style from './Register.module.css'
import { useLocation } from 'react-router-dom';
import Signup from '../../components/Signup/Signup';
const Register = () => {
  const location = useLocation();

  console.log('Current Path:', location.pathname);
  return (
    <div className={style.registerContainer}>
      <img src={sally} width={940} height={750} className={style.image} alt='fusee'/>
      <div className={style.imageContainer}>
      </div>
      <div className={style.loginContainer}>
      {location.pathname.includes('/logIn') && <Login />}
        {location.pathname.includes('/signup') && <Signup />}
      </div>
    </div>
  )
}

export default Register
