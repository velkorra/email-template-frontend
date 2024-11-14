import axios from "axios";
import { API_CONFIG } from "../config/api.config";
import { authStore } from "./tokenStore";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = authStore.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use((response) => {
  const newToken = response.headers["authorization"];
  if (newToken) {
    const token = newToken.replace("Bearer ", "");
    authStore.setToken(token);
  }
  return response;
});
