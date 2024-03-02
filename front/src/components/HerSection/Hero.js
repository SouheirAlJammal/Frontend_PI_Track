import React from 'react'
import style from './Hero.module.css'
import girl from '../../assets/Girl.png'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"
import BackGround from '../BackGround/BackGround'
const Hero = () => {
  return (
    <div className={style.container}>
      <section className={style.leftSection}>
        {/* <h1 className={style.title1}>PI-Track</h1> */}
        <h1 className={style.title2}>Supercharge Your <span className={style.title3}>Productivity</span></h1>
        <p className={style.subtitle}>Take control of your tasks and study progress with our powerful task management and study tracker.</p>
        <Link to='/dashboard/overView' className={style.link}><button className={style.actionButton}>Get Started <FaArrowRight /></button> </Link>
      </section>
      <img alt='girl-Learner' src={girl} loading='lazy' className={style.img} />
     <BackGround/>
    </div>
  )
}

export default Hero
