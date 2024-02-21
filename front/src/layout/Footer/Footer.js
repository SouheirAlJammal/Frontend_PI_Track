import React from 'react'
import Logo from '../Logo/Logo'
import style from './Footer.module.css'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div className={style.container}>
           <Link to='/'className={style.link}> <Logo /></Link>
            <nav>
                <ul className={style.list}>
                    <Link className={style.link} to='/process'><li>PI-Track Process</li></Link>
                    <Link className={style.link} to='/dashboard'><li>Start your Plan</li></Link>
                    <Link className={style.link} to='/contactUs'><li>Contact Us</li></Link>
                </ul>
            </nav>
        </div>
    )
}

export default Footer
