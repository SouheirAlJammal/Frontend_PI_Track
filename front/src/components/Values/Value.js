import React from 'react'
import style from './Value.module.css'
const Value = ({value:{srcImg,alt,title,content}}) => {
  return (
    <div className={style.container }>
      <img  className={style.img} alt={alt} src={srcImg} loading='lazy' width={156} height={156}/>
      <div className={style.card}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.content}>{content}</p>
      </div>
    </div>
  )
}

export default Value
