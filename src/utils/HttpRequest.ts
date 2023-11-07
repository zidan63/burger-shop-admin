import axios, { AxiosRequestConfig } from "axios";
import { NotificationUtil } from "./NotificationUtil";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    charset: "utf-8",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("error: ", error);
    let message = "";
    switch (error?.response?.status) {
      case 500: {
        message = `Máy chủ lỗi!`;
        break;
      }
      default: {
        message = error?.response?.data?.message || "Máy chủ lỗi!";
        break;
      }
    }
    if (Array.isArray(message)) NotificationUtil.error(message);
    else NotificationUtil.error([message]);
    return Promise.reject(error);
  }
);

export class HttpRequest {
  public static async get<T = any>(url: string, params: any = {}, config: AxiosRequestConfig = {}) {
    return instance.request<any, T>({ method: "GET", url, params, ...config });
  }

  public static async post<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}) {
    return instance.request<any, T>({ method: "POST", url, data, ...config });
  }

  public static async patch<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}) {
    return instance.request<any, T>({ method: "PATCH", url, data, ...config });
  }

  public static async put<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}) {
    return instance.request<any, T>({ method: "PUT", url, data, ...config });
  }

  public static async delete<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return instance.request<any, T>({ method: "DELETE", url, ...config });
  }
}
