import React, { useEffect } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import axios from 'axios';
import { useUserStore } from './Store';
import Loader from './components/Loader/Loader';

axios.defaults.withCredentials = true;

function App() {
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/users/user`);
      await setUser(response.data.data)
    } catch (err) {
      console.error("Error fetching user data:", err);
      await setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
}, []);

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
