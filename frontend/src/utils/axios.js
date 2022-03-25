import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export default instance;
