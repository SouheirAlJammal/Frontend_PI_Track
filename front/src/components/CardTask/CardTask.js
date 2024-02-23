import React from 'react'
import styles from './CardTask.module.css'
const CardTask = ({task:{title,description,startDate,endDate}}) => {
  return (
    <div className={`${styles['ag-courses_item']}`}>
      <div className={styles['ag-courses-item_link']}>
        <div className={styles['ag-courses-item_bg']}></div>

        <h3 className={styles['ag-courses-item_title']}>
          {(title.length > 12) ? (title.substring(0, 12) + '...') : title}
        </h3>
        <p className={styles.content}>{description.substring(0, 40) + '...'}</p>
        <section className={styles.dateWrapper}>
          <div className={styles['ag-courses-item_date-box']}>
            Start:
            <span className={styles['ag-courses-item_date']}>
              {new Date(startDate).toISOString().split('T')[0]}
            </span>
          </div>

          <div className={styles['ag-courses-item_date-box']}>
            End:
            <span className={styles['ag-courses-item_date']}>
              {new Date(endDate).toISOString().split('T')[0]}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CardTask
