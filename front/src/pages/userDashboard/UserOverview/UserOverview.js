import React, { useEffect, useState } from 'react';
import style from './UserOverview.module.css';
import PlanProgressCrad from '../../../components/PLanProgressCard/PlanProgressCrad';
import RadialTaskStatus from '../../../components/RadialTaskStatus/RadialTaskStatus';
import axios from 'axios';
import DashHead from '../../../components/DashHead/DashHead'
import { useUserStore } from '../../../Store';
import ChartComponent from '../../../components/Chart/Chart';
import TodayTask from '../../../components/TodayTask/TodayTask'
import Loader from '../../../components/Loader/Loader'

const UserOverview = () => {
  const { user } = useUserStore();
  const [plansProgress, setPlansProgress] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const WelcomeExpression = 'Welcome back, ' + user.username + '!';
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //mock data 
  const plans = [
    {
      "planId": "6134f4ab93be59001f2e01e0",
      "title": "Sample Plan 1",
      "progressPercentage": 50,
      "totalLessons": 2
    },
    {
      "planId": "6134f4ab93be59001f2e01e1",
      "title": "Sample Plan 2",
      "progressPercentage": 40,
      "totalLessons": 2
    },
    {
      "planId": "6134f4ab93be59001f2e01e1",
      "title": "Sample Plan 2",
      "progressPercentage": 40,
      "totalLessons": 2
    },
 
  ]



  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/tasks/`);
      if (response) {
        setTasks(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }



  async function getPlansWithProgress() {

  
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}api/statistics/plansWithProgress`
      );
      if (response) {
        setPlansProgress(response.data.data);
        // setPlansProgress(plans)
        console.log(plansProgress,'plans')
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function getStateStatus() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}api/statistics/taskStatistics`
      );
      if (response) {
        setStatus(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getStateStatus();
      await getPlansWithProgress();
      await getTasks()
      setLoading(false);
    };

    fetchData();

    
  // Update window width on resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  // Cleanup event listener on component unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };


  }, []);

  return (
    <>
    <section className={style.Overview}>
        <DashHead
          title={loading ? 'Loading...' : WelcomeExpression}
          subtitle='Always stay organised in your study plan'
          date={true}
        />

        {loading ? (
          <Loader />
        ) : (
          <section style={{ width: '100%' }}>
            {/* Your content here */}
            <section className={style.statistics}>
              <section className={style.progress}>
                <h3>Lessons Progress</h3>
                <ChartComponent />
              </section>

              <section className={style.taskStatus}>
                <h3>Tasks Status</h3>
                <RadialTaskStatus data={status} />
              </section>

              {/* Responsive order based on window width */}
              {windowWidth < 1600 ? (
                <>
                  <div className={style.plansContainer}>
                    <h3>Most Active Plans</h3>
                    {plansProgress.length > 0 ? (
                      plansProgress.map((plan, i) => (
                        <PlanProgressCrad
                          key={i}
                          title={plan.title}
                          lessons={plan.totalLessons}
                          value={plan.progressPercentage}
                          index={i}
                        />
                      ))
                    ) : (
                      <p>There are no plans yet.</p>
                    )}
                  </div>
                  <div className={style.todayTask}>
                    <TodayTask rows={tasks} />
                  </div>
                </>
              ) : (
                <>
                  <div className={style.todayTask}>
                    <TodayTask rows={tasks} />
                  </div>
                  <div className={style.plansContainer}>
                    <h3>Most Active Plans</h3>
                    {plansProgress.length > 0 ? (
                      plansProgress.map((plan, i) => (
                        <PlanProgressCrad
                          key={i}
                          title={plan.title}
                          lessons={plan.totalLessons}
                          value={plan.progressPercentage}
                          index={i}
                        />
                      ))
                    ) : (
                      <p>There are no plans yet.</p>
                    )}
                  </div>
                </>
              )}
            </section>
          </section>
        )}
      </section>
    </>
  );
  

};

export default UserOverview;
