import React from 'react'
import style from './TaskStatus.module.css'
const TaskStatus = ({nbr,status,color}) => {
  return (
    <div className={style.container} style={{backgroundColor:color}}>
      <p className={style.nbr}>{nbr}</p>
      <p className={style.status}>{status}</p>
    </div>
  )
}

export default TaskStatus
