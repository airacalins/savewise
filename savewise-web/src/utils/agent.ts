import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { APP_BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const request = {
  get: (url: string, params?: AxiosRequestConfig) =>
    axiosInstance.get(url, params).then(responseBody),
  post: (url: string, body: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post(url, body, config).then(responseBody),
  put: (url: string, body: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put(url, body, config).then(responseBody),
  delete: (url: string, params?: AxiosRequestConfig) =>
    axiosInstance.delete(url, params).then(responseBody),
};
