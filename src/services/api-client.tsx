import axios, { AxiosRequestConfig } from "axios";

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
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
