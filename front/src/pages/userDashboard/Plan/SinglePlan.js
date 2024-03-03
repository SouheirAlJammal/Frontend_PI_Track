import React, { useState, useEffect } from 'react'
import style from './SinglePLan.module.css'
import DashHead from '../../../components/DashHead/DashHead'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import LessonCard from '../../../components/LessonsCard/LessonCard';
import TaskHeader from '../../../components/taskHeader/TaskHeader';
import LessonForm from '../../../components/LessonForm/LessonForm';
import SingleLesson from '../Lessons/SingleLesson/SingleLesson';
import InvitationForm from '../../../components/Invitation/InvitationForm';
const SinglePlan = () => {

  //get plan 
  const [plan, setPlan] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  let { planId } = useParams()
  async function getPlan() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}api/plans/onePlan/${planId}`
      );
      if (response) {
        setPlan(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const getLessons = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/lessons/${planId}`);
      setLessons(response.data.data);
    } catch (error) {
      console.error('Error fetching lessons', error);
    } finally {
      setLoading(false);
    }
  };

  const getFollowers = async () => {
    console.log(planId,'byeeeeeee')

    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/plans/followers/${planId}`);
      console.log(response.data.participants,'dataaaaaaaaaaaa')
      setFollowers(response.data.participants);
    } catch (error) {
      console.error('Error fetching followers Info', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getPlan();
    getLessons();
    getFollowers();
  }, []);
  return (
    <div className={style.container}>
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <>
          <DashHead title={plan.title} subtitle={plan.description} date={true} followers={followers} />
          <section className={style.lessons}>
            <TaskHeader getData={getLessons} title="Lesson" subtitle="Track your daily progresss !">
              <LessonForm planId={planId} />
            </TaskHeader>

            <section className={style.lessons}>
              {lessons.map((lesson, index) => (
                <SingleLesson key={index} lesson={lesson} id={lesson._id} getLessons={getLessons} />
              ))}
            </section>
          </section>
        </>
      )}

      <section className={style.lessonsProgress}></section>
    </div>
  )
}

export default SinglePlan
