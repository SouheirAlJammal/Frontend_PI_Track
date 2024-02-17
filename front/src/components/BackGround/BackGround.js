import React from 'react'
import style from './BackGround.module.css'
const BackGround = () => {
  return (
        <div className={`${style.absolute}  ${style.inset0} ${style.justifyCenter}  `}>
            <div className={`${style.bgShape1}  ${style.bgTeal} ${style.opacity}  ${style.blur}  `}></div>
            <div className={`${style.bgShape2}  ${style.primary} ${style.opacity}  ${style.blur}  `}></div>
            <div className={`${style.bgShape3}  ${style.purple} ${style.opacity}  ${style.blur}  `}></div>
        </div>
  )
}

export default BackGround
