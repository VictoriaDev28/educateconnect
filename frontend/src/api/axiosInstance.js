import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

axiosInstance.interceptors.request.use(config => {
    const accessToken = sessionStorage.getItem("accessToken") || ""

    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    // Don't set Content-Type for FormData - let axios set it automatically
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }

    return config
},
(err) => Promise.reject(err))

export default axiosInstance