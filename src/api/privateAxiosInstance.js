import axios from "axios";
import publicAxiosInstance from "./publicAxiosInstance";


const privateAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_LOCAL_URL,
    withCredentials: true,
    timeout: 1000000
});

privateAxiosInstance.interceptors.request.use(
    (request) => {
        const accessToken = localStorage.getItem('accessToken');
        request.headers['Authorization'] = `Bearer ${accessToken}`;

        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

privateAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async(error) => {
        const originalRequest = error.config;
        if(error.response && error.response.status === 401 && !originalRequest._retry){
                originalRequest._retry = true;

                try{
                    const res = await publicAxiosInstance.post('/auths/refresh', 
                        {},
                        {withCredentials: true}
                    );

                    if(res.status < 400){
                        const newAccessToken = res.data.accessToken;
                        localStorage.setItem('accessToken', newAccessToken);
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                        return privateAxiosInstance(originalRequest)
                    }
                }
                catch(err){
                    console.log(err);
                    localStorage.removeItem('accessToken')
                    console.log(err.message);
                    
                    window.location.href = '/logging'
                    return Promise.reject(err)
                }
            }
            return Promise.reject(error)
    }
);

export default privateAxiosInstance;
