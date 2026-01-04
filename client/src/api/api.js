import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  withCredentials: true, //  needed for admin cookies
});

api.interceptors.request.use((config) => {
  //  USER JWT
  const userToken = localStorage.getItem("token");

  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

export default api;
