import React, { useState, useEffect } from 'react'
import style from './DashHead.module.css'
const DashHead = ({ title, subtitle, date,image }) => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        if (date) {

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Date().toLocaleDateString('en-US', options);
            setCurrentDate(formattedDate);
        } else setCurrentDate('')
    }, [currentDate,date]);

    return (
        <div className={style.containerParent}>
            <section className={style.container}>
            <time dateTime={new Date().toISOString()} className={style.subtitle}>{currentDate}</time>
            <h1 className={style.title}>{title}</h1>
            <p className={style.subtitle}>{subtitle}</p>
            </section>
           { (image)? <img alt={image.alt} src={image.src} loading='lazy' className={style.image} width={200} height={200}/> : ''}
        </div>
    )
}

export default DashHead
