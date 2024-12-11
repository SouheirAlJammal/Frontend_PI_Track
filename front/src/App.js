import React, { useEffect } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import axios from 'axios';
import { useUserStore } from './Store';
import Loader from './components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

function App() {
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/users/user`);
      setUser(response.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setIsLoading(false); 
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }


  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
