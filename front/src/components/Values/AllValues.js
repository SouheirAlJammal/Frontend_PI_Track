import React from 'react'
import girl from '../../assets/Girl.png'
import style from './AllValues.module.css'
import Value from './Value'
const AllValues = () => {
  const values = [
    { srcImg: girl, alt: "alt", title: "Task Prioritization", content: "Easily prioritize your tasks based on importance and urgency, ensuring that you focus on what matters most." },
    { srcImg: girl, alt: "alt", title: "Study Planning", content: "Create a study plan that fits your schedule and helps you stay on track with your learning goals." },
    { srcImg: girl, alt: "alt", title: "Progress Tracking", content: "Track your daily progress and see how far you've come in your learning journey." },
    { srcImg: girl, alt: "alt", title: "Efficiency Optimization", content: "Optimize your study sessions and tasks to make the most of your time and be more productive." }
  ]



  return (
    <div className={style.valuesContainer}>
      <h1 className={style.title}>Values</h1>
      <p className={style.subtitle}>Our task management and study tracker offers a range of services to help you stay organized and optimize your learning journey.</p>
      <section className={style.values}>{values.map(elt => <Value  value={elt}/>)}</section>
    </div>
  )
}

export default AllValues
