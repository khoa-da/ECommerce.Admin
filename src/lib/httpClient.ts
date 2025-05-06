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
    (error) => {
        console.log("Error in request:", error);
        // Xử lý lỗi request ở đây (nếu cần)
        return Promise.reject(error);
    }
);



httpClient.interceptors.response.use(function (response) {
    console.log('Response:', response);
    return response;
}, async (error) => {
    const originalRequest = error.config;
    console.log('Khoa :', error);

    if (error?.response) {
        console.log('Error response:', error.response);

        // Xử lý lỗi 401
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            const userId = localStorage.getItem('userId'); // bạn cần lưu userId khi login

            if (!refreshToken || !userId) {
                console.error('Thiếu refreshToken hoặc userId');
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
                    userId,
                    refreshToken
                });
                console.log('Refresh token response:', response.data);
                console.log('New access token:', response.data.accessToken);
                console.log('New refresh token:', response.data.refreshToken);


                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken); // cập nhật refreshToken mới
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return httpClient(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
                window.location.href = '/login'; // hoặc trang đăng nhập của bạn
                return Promise.reject(refreshError);
            }
        }
    } else {
        console.error('Network error or request cancelled:', error.message);
    }

    return Promise.reject(error);
}
);




export default httpClient;