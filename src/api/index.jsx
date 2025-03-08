import { BASE_URL } from "@/config/1";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const clientToken = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

clientToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

clientToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Navigate("/login");
    }

    return Promise.reject(error);
  }
);
