import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://localhost:7062/api/v1'; // Địa chỉ API của bạn

const httpClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Gắn token từ localStorage (hoặc nơi bạn lưu trữ)
httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default httpClient;
