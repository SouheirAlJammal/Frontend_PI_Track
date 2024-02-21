import React from 'react'
import TaskHeader from '../../../components/taskHeader/TaskHeader'
import TaskStatus from '../../../components/taskStatus/TaskStatus'
import style from './Task.module.css'
const Task = () => {
  return (
    <div className={style.tasks}>
      <TaskHeader />
      <section className={style.statusContainer}>
        <TaskStatus nbr={20} status='Pending' color='#EBD0C9' />
        <TaskStatus nbr={3} status='Completed' color='#C8DFE7' />
      </section>
    </div>
  )
}

export default Task
