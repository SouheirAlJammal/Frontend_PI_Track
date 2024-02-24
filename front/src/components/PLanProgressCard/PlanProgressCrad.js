import React from 'react'
import style from './PlanProgressCrad.module.css'
import ProgressCircle from '../../components/ProgressCircle/ProgressCircle'

const PlanProgressCrad = ({ title, lessons,value }) => {
  return (
    <article className={style.cardContainer}>
      <p className={style.title}>{title}</p>
      <p className={style.lessons}>{lessons} lessons</p>
      <ProgressCircle  value={value}/>
    </article>
  )
}

export default PlanProgressCrad
