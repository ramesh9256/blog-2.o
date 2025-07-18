import axios from 'axios';

const API = axios.create({
  baseURL: 'https://blog-app-t3cq.vercel.app/api/v1',
  withCredentials: true
});

export default API;

// http://localhost:5000/api/v1
