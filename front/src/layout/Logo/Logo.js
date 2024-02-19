import React from 'react'
import styles from './Logo.module.css'
import { SiSquarespace } from "react-icons/si";

const Logo = ({color}) => {
  return (
    <div className={styles['logo']}>
    <SiSquarespace className={styles.image} style={{color:color}}/>
      <h1 className={styles.name} style={{color:color}}>PI-Track</h1>
  </div>
  )
}

export default Logo
