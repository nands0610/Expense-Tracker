// src/api.js
import axios from 'axios';

// Create an Axios instance with your Flask backend's base URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // update if using a different URL or port
  headers: {
    'Content-Type': 'application/json',
  },
});

// API function for login
export const loginUser = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  };

// API function for signup
export const signupUser = async (username, email, password) => {
  const response = await api.post('/signup', { username, email, password });
  return response.data;
};

export default api;
