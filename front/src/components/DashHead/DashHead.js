import React, { useState, useEffect } from 'react'
import style from './DashHead.module.css'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PopupForm from '../Invitation/PopupForm';
const DashHead = ({ title, subtitle, date, followers }) => {
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        if (date) {

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Date().toLocaleDateString('en-US', options);
            setCurrentDate(formattedDate);
        } else setCurrentDate('')
    }, [currentDate, date]);

    return (
        <div className={style.containerParent}>
            <section className={style.container}>
                <time dateTime={new Date().toISOString()} className={style.subtitle}>{currentDate}</time>
                <h1 className={style.title}>{title}</h1>
                <p className={style.subtitle}>{subtitle}</p>
            </section>
            {followers ? (
                <div className={style.followers}>
                    <h5>Plan Participants: </h5>
                <AvatarGroup max={3}>
                    {followers.map((follower) => (
                        <Avatar key={follower.userId.username} alt={follower.userId.username} src={follower.userId.image}>
                          {follower.userId.username[0]}
                        </Avatar>
                    ))}
                </AvatarGroup>
                <PopupForm/>
                </div>
            ) : (
                <div>''</div>
            )}
        </div>
    )
}

export default DashHead
