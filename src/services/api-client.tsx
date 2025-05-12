import axios, { AxiosError, AxiosRequestConfig } from "axios";
import useAuthStore from "@/authStore.ts";
import router from "@/routes.tsx";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  content: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

const axiosInstanceWithoutAuth = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout(); // Clear token from Zustand
      const currentPath = window.location.pathname;
      router.navigate(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
    }
    return Promise.reject(error);
  },
);

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstanceWithoutAuth
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  get = (id: number | string) => {
    return axiosInstanceWithoutAuth
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
  post = (data: T) => {
    return axiosInstance
      .post<T>(this.endpoint, data)
      .then((res) => res.data);
  };
  postForm = (formData: FormData) => {
    return axiosInstance
        .post<T>(this.endpoint, formData)
        .then((res) => res.data);
  };
  put = (id: number | string, data: T) => {
    return axiosInstance
      .put<T>(this.endpoint + "/" + id, data)
      .then((res) => res.data);
  };
  delete = (id: number | string) => {
    return axiosInstance
      .delete<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
}
export default ApiClient;
