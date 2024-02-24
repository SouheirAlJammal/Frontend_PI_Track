import React, { useEffect, useState } from 'react';
import style from './UserOverview.module.css';
import PlanProgressCrad from '../../../components/PLanProgressCard/PlanProgressCrad';
import RadialTaskStatus from '../../../components/RadialTaskStatus/RadialTaskStatus';
import axios from 'axios';

const UserOverview = () => {
  const [plansProgress, setPlansProgress] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getPlansWithProgress() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}api/statistics/plansWithProgress`
      );
      if (response) {
        setPlansProgress(response.data.data);
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
      await getPlansWithProgress();
      await getStateStatus();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={style.Overview}>
          <div className={style.plansContainer}>
            <h3>Plans Progress</h3>
            {plansProgress.length > 0 ? (
              plansProgress.map((plan, i) => (
                <PlanProgressCrad key={i} title={plan.title} lessons={plan.lessons} value={plan.progressPercentage} index={i} />
              ))
            ) : (
              <div>There are no plans yet.</div>
            )}
          </div>
          <RadialTaskStatus data={status} />
        </div>
      )}
    </div>
  );

};

export default UserOverview;
