// AllValues component
import React from 'react';
import graphs from '../../assets/graph.png'
import style from './AllValues.module.css';
import stat from '../../assets/Man Pose - 03.png'
import teamWork from '../../assets/team.png'
import Value from './Value';
import organised from '../../assets/Woman Pose - 03.png'
import sharing from '../../assets/collaboration.png'
import pencil from '../../assets/Lady with pencil.png'
import { Element } from 'react-scroll';

const AllValues = () => {
    const values = [
        { 
            srcImg: organised, 
            alt: "alt", 
            title: "Stay Organized", 
            content: "Effortlessly organize your daily tasks and lessons, ensuring an efficient and structured approach to your continuous learning." 
        },
        { 
            srcImg: sharing, 
            alt: "alt", 
            title: "Share Knowledge", 
            content: "Connect with others, share your knowledge, and stay motivated within shared study plans." 
        },
        { 
            srcImg: pencil, 
            alt: "alt", 
            title: "Continuous Learning", 
            content: "Embrace a culture of continuous learning for personal and collective growth through ongoing education and skill development." 
        },
        { 
            srcImg: teamWork, 
            alt: "alt", 
            title: "Collaborative Learning", 
            content: "Create a collaborative learning environment by inviting friends to your study plans, fostering a shared journey towards knowledge and achievement." 
        },
        { 
            srcImg: graphs, 
            alt: "alt", 
            title: "Check Progress", 
            content: "Track your progress on each lesson and within the entire plan, comparing achievements and gaining insights into educational milestones." 
        },
        { 
            srcImg: stat, 
            alt: "alt", 
            title: "Progress Visualization", 
            content: "Effortlessly visualize progress on each lesson and the overall plan daily, weekly, and yearly for a comprehensive overview of your continuous learning journey." 
        }
    ];
    
    return (
        <Element className={style.valuesContainer} name="valuesSection" id='values'>
            <h2 className={style.title}>Values</h2>
            <p className={style.subtitle}>Stay organized and optimize your learning journey.</p>
            <section className={style.values}>{values.map((elt, i) => <Value value={elt} key={i} />)}</section>
        </Element>
    );
};

export default AllValues;
