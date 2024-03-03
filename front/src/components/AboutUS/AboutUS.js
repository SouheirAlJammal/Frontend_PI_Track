import React from 'react'
import style from './AboutUs.module.css'
import { Element } from 'react-scroll';

const AboutUS = () => {
    return (
        <Element className={style.container} name="aboutUsSection" id='aboutUs'>

            <h2 className={style.titleAbout}>Who we are?</h2>
            <div className={style.AboutContainer}>
                <article className={`${style.About}`}>
                    <h3 className={`${style.title}`} >About Us</h3>
                    <p className={`${style.content}`}>Welcome to PI-Track, a dedicated platform for self-learning, collaborative study plans, and efficient task management.
                        More than a traditional project management tool, PI-Track is designed to facilitate personalized learning journeys.
                        We understand the importance of continuous education and have created a space where individuals can create,
                        share, and track study plans along with managing tasks to enhance their knowledge and skills.</p>
                </article>
                <article className={`${style.About}`}>
                    <h3 className={`${style.title}`}>Our Aim</h3>
                    <p className={`${style.content}`}>Our mission at PI-Track is to transform the way people approach self-learning and task management.
                        We chose PI-Track because it aligns with our vision of making learning and task organization seamless and rewarding.
                        By providing a platform for creating and sharing study plans, along with efficient task management, PI-Track empowers users to embark on educational journeys that are meaningful and impactful.
                        Join PI-Track to cultivate a culture of lifelong learning, effective task management, and turn every study plan into a step toward personal and collective growth.</p>
                </article>
            </div>
        </Element>

    )
}

export default AboutUS
