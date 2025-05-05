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
        console.log('Access Token:', localStorage.getItem('accessToken'));
        console.log('Refresh Token:', localStorage.getItem('refreshToken'));
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
httpClient.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    const originalRequest = error.config;
    console.log('Khoa :', error);
    // Kiểm tra xem error.response có tồn tại không
    if (error.response) {
        console.log('Error response:', error.response);

        // Xử lý lỗi 401 Unauthorized
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    // Không có refresh token, đăng xuất hoặc chuyển hướng đến trang đăng nhập
                    console.error('No refresh token available');
                    // Có thể thêm logic đăng xuất ở đây
                    return Promise.reject(error);
                }

                const response = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
                console.log('New token:', response.data.accessToken);
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return httpClient(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed', refreshError);
                // Có thể thêm logic đăng xuất ở đây
                return Promise.reject(refreshError);
            }
        }
    } else {
        // Xử lý lỗi khi không có response (network error, timeout, etc.)
        console.error('Network error or request cancelled:', error.message);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});



export default httpClient;