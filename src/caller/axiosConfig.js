import axios from 'axios';

const getToken = () => {
    const accessToken = localStorage.getItem('access_token');
    return accessToken ? accessToken : null;
};

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = getToken();
        if (accessToken) config.headers['Authorization'] = "Bearer " + accessToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
  
export default instance; 