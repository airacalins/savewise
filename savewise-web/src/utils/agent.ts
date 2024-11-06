import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { APP_BASE_URL } from "./constants";
import { showErrorToast } from "./toast";

const axiosInstance = axios.create({
  baseURL: APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;
    // if (status === 401) {
    //   removeAuthTokenFromCookie();
    //   window.location.replace("/auth/sign-in");
    // }

    if (status === 400) {
      if (data.errors) {
        const modelStateErrors: string[] = [];
        for (const key in data.errors) {
          if (typeof data.errors[key] !== "undefined") {
            const errorKey = data.errors[key][0];
            modelStateErrors.push(errorKey);
            console.log(JSON.stringify(errorKey, null, 2));
          }
        }

        throw modelStateErrors.flat();
      }

      showErrorToast(data);
    }

    if (status === 500) {
      showErrorToast("Server error");
    }

    return Promise.reject(error.response);
  }
);

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
