import React from 'react'
import style from './LessonCard.module.css'
import { LinearProgress } from '@mui/material'
const LessonCard = ({lesson,id}) => {
  let progress = (((lesson.lessonProgress[0].achievedMins /lesson.totalMins)) * 100).toFixed(2);
  console.log('kkkkkkkkkkk',lesson.lessonProgress[0])
  return (
    <div className={style.container}>
    <section className={style.Info}>
      <h4 className={style.lessonTitle}> {(lesson.title.length > 30) ? (lesson.title.substring(0, 30) + '...') : lesson.title}</h4>
      <p className={style.description}>
      {(lesson.description.length > 80) ? (lesson.description.substring(0, 80) + '...') : lesson.description}
      </p>
      <LinearProgress
            variant="determinate"
            value={progress || 0}
            style={{
              backgroundColor: '#EAEAEA',
              height: '7px',
              borderRadius: '10px',
              marginTop:'10px',
              width: '90%'
            }}
            sx={{
              '.css-5xe99f-MuiLinearProgress-bar1': {
                backgroundColor: 'rgb(226, 17, 157) !important',
              }
            }}
          />
          <span>{progress || 0} %</span>
          </section>
          <section className={style.footer}>
            <p>Total {lesson.totalMins}mins</p>
            <p>Achieved {lesson.lessonProgress[0].achievedMins}mins</p>

          </section>
    </div>
  )
}

export default LessonCard
