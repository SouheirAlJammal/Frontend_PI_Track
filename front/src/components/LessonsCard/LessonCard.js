import React from 'react'
import style from './LessonCard.module.css'
import { LinearProgress } from '@mui/material'
const LessonCard = ({lesson}) => {
  console.log('kkkkkkkkkkk',lesson.lessonProgress[0].achievedMins)
  return (
    <div>
      <h5 className={style.lessonTitle}>{lesson.title}</h5>
      <LinearProgress
            variant="determinate"
            value={lesson.lessonProgress[0].achievedMins || 0}
            style={{
              backgroundColor: '#EAEAEA',
              marginTop: '30px',
              height: '6px',
              borderRadius: '10px',
              marginLeft: '20px',
              width: '80%'
            }}
            sx={{
              '.css-5xe99f-MuiLinearProgress-bar1': {
                backgroundColor: 'rgb(226, 17, 157) !important',
              }
            }}
          />
          <p className={style.status}>{lesson.status}</p>
          <footer>
            <p>Total Min {lesson.totalMins}</p>
            <p>Achieved Mins {lesson.lessonProgress[0].achievedMins}</p>

          </footer>
    </div>
  )
}

export default LessonCard
