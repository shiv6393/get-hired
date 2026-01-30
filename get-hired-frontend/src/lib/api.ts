import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    toast.error(message);

    return Promise.reject(error);
  },
);
