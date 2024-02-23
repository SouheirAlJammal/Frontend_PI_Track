// AllValues component
import React from 'react';
import prof from '../../assets/proficinant.png'
import prioritize  from '../../assets/management.png'
import flex from '../../assets/flexibiity.png'
import style from './AllValues.module.css';
import tasks from '../../assets/toDoTask.png'
import teamWork from '../../assets/team.png'
import Value from './Value';
import { Element } from 'react-scroll';

const AllValues = () => {
    const values = [
        { srcImg: prioritize, alt: "alt", title: "Task Prioritization", content: "Easily prioritize your tasks based on importance and urgency, ensuring that you focus on what matters most." },
        { srcImg: flex, alt: "alt", title: "Study Planning", content: "Create a study plan that fits your schedule and helps you stay on track with your learning goals." },
        { srcImg: teamWork, alt: "alt", title: "Progress Tracking", content: "Track your daily progress and see how far you've come in your learning journey." },
        { srcImg: prof, alt: "alt", title: "Efficiency Optimization", content: "Optimize your study sessions and tasks to make the most of your time and be more productive." },
        { srcImg: tasks, alt: "alt", title: "Efficiency Optimization", content: "Optimize your study sessions and tasks to make the most of your time and be more productive." },
        { srcImg: prof, alt: "alt", title: "Efficiency Optimization", content: "Optimize your study sessions and tasks to make the most of your time and be more productive." }
    ];

    return (
        <Element className={style.valuesContainer} name="valuesSection" id='values'>
            <h2 className={style.title}>Values</h2>
            <p className={style.subtitle}>Stay organized and optimize your learning journey.</p>
            <section className={style.values}>{values.map((elt,i)=> <Value value={elt} key={i} />)}</section>
        </Element>
    );
};

export default AllValues;
