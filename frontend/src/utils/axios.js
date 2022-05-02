import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_ORIGIN,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export default instance;
