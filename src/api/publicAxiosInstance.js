import axios from "axios";


const publicAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_LOCAL_URL,
    withCredentials: true,
    timeout: 1000000
});

export default publicAxiosInstance;