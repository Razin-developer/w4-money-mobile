import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://w4-money-backend.onrender.com/api',
  withCredentials: true
});