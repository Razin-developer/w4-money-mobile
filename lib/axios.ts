import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://preferably-outgoing-macaw.ngrok-free.app/api',
  withCredentials: true
});