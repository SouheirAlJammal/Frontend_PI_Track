import { useState } from 'react';
import axiosInstance from '../utils/axios';
import { useUserStore } from '../Store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useApi = () => {
    const { setUser } = useUserStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const apiCall = async ({ url, method, data = null }) => {
        try {
            setLoading(true);
            const response = await axiosInstance({
                url,
                method,
                data
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error(error.response.data.message)
                    setUser(null); // Unauthorized: Token is invalid or expired
                    navigate('/')
                } else if (error.response.status === 403) {
                    toast.error("Forbidden Access")
                }
            }
            throw error; 
        } finally {
            setLoading(false);
        }
    };

    return { apiCall, loading };
};

export default useApi;
