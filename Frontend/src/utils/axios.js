import axios from 'axios';

const API = axios.create({
  baseURL: 'https://blog-app-hwv2.onrender.com/',
  withCredentials: true
});

export default API;

// http://localhost:5000/api/v1
