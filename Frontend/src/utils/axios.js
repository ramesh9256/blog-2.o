import axios from 'axios';

const API = axios.create({
  baseURL:'https://blog-2-o.onrender.com/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;

// http://localhost:5000/api/v1
// https://blog-2-o.onrender.com/api/v1
