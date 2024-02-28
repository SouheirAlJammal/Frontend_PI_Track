import React from 'react'
import styles from './PlanCard.module.css'
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
const PlanCard = ({ article, animationOrder }) => {
let progress

  if(article.totalMins !==0){ progress = (article.participants && article.participants.length > 0) ? parseFloat(((article.participants[0].achievedTotalMins / article.totalMins )* 100).toFixed(2)) : 0}
  return (
    <div className={styles.article} style={{ "--animation-order": animationOrder }}>
      <Link className={styles.link} to={`plan/${article._id}`}>
        <div className={`${styles.content}`} aria-hidden="true">
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.description}> {(article.description.length > 50) ? (article.description.substring(0, 50) + '...') : article.description}</p>
{          (progress)?<p className={styles.description2}>{article.lessonsId.length} Lessons {progress !== undefined ? `/${progress}%` : ''}</p>:<p className={styles.description2}>{article.lessonsId.length} Lessons</p>}
          <LinearProgress
            variant="determinate"
            value={progress|| 0}
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
        </div>
      </Link>
    </div>
  )
}

export default PlanCard
