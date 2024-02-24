import { useEffect } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import axios from 'axios'
import { useUserStore } from './Store';
axios.defaults.withCredentials = true;
function App() {
const {user ,setUser}=useUserStore();
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/users/user`, { withCredentials: true });
      setUser(response.data.data)
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUser(null)
    }
  }

  useEffect(()=>{
fetchUser()
  },[])
  return (
    <div className="App">
   <AppRoutes/>
    </div>
  );
}

export default App;
