import axios from 'axios';

// Create a new instance of axios with a custom configuration
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL + '/api'
});

// Use an "interceptor" to run code before every request is sent
apiClient.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('adminToken');

        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Return the modified request configuration
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default apiClient;