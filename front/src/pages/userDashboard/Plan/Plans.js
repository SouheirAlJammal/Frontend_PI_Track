import React,{useState,useEffect} from 'react'
import DashHead from '../../../components/DashHead/DashHead'
import TaskHeader from '../../../components/taskHeader/TaskHeader'
import style from './Plans.module.css'
import axios from 'axios'
import PlanForm from '../../../components/PlanForm/PlanForm'
const Plans = () => {

      //get Alll Tasks 
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
 
 async function getPlans() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}api/plans/`
      );
      if (response) {
        setPlans(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  useEffect(() => {
    getPlans();
  }, []);

  return (
    <div className={style.plansPage}>
        <DashHead title='Your Plan management area' subtitle='make your day more organised' date={true} />
        <TaskHeader getData={getPlans} title="Plan" subtitle="Start creating your Plans!" formComponent={PlanForm} />

    </div>
  )
}

export default Plans
