import React ,{useState,useEffect} from 'react'
import { useNavigate ,useParams} from 'react-router-dom';
import style from './AcceptInvitation.module.css'
import axios from 'axios'
const AcceptInvitation = () => {

    const navigate = useNavigate();
    const { planId, invitationId } = useParams();
    const [planInfo, setPlanInfo] = useState({});
    const [createrName, setCreaterName] = useState('');
    const [loading, setLoading] = useState(true);
    console.log('heloooooo',planId,invitationId)

    useEffect(() => {
        const fetchPlanInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/plans/onePlan/${planId}`);
                setPlanInfo(response.data.data);

                const creater= await axios.get(`${process.env.REACT_APP_ENDPOINT}api/users/userById`,{
                   userId: response.data.data.createrId
                });
                console.log(creater.data.data.userName,'ggggggggg')
                setCreaterName(creater.data.data.userName)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching plan information:', error);
            }
        };

        fetchPlanInfo();
    }, []);


    console.log(createrName,planInfo)

    const handleAcceptInvitation = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_ENDPOINT}api/plans/acceptInvitation`,{
                planId,
                invitationId
            });

            navigate('/dashboard/overview');
        } catch (error) {
            console.error('Error accepting invitation:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

  return (
    <div className={style.container}>
    <h2>Accept Invitation</h2>
    <p>You are invited to join the plan:</p>
    <h3>{planInfo.title}</h3>
    <p>Created by: {createrName}</p>
    <button onClick={handleAcceptInvitation}>Accept Invitation</button>
</div>
  )
}

export default AcceptInvitation
