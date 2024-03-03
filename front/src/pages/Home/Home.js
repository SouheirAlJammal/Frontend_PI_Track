import React from 'react'
import style from './Home.module.css'
import Hero from '../../components/HerSection/Hero'
import AllValues from '../../components/Values/AllValues'
import Contact from '../../components/ContactForm/Contact'
import AboutUS from '../../components/AboutUS/AboutUS'
const Home = () => {


  return (
    <div className={style.container}>
      <Hero />
      <AboutUS/>
      <AllValues/>
      <Contact/>
    </div>
  )
}

export default Home
