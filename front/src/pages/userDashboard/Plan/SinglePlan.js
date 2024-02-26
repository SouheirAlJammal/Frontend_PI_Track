import React, { useState, useEffect } from 'react'
import style from './SinglePLan.module.css'
import DashHead from '../../../components/DashHead/DashHead'
import { useParams } from 'react-router-dom';
import axios from 'axios'
const SinglePlan = () => {

    //get plan 
    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(true);
    let {planId} = useParams()
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


    useEffect(() => {
        getPlan();
    }, []);
    return (
        <div className={style.container}>
                  <DashHead title={plan.title} subtitle={plan.description} date={true} />

        </div>
    )
}

export default SinglePlan
