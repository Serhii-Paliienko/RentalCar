import axios from "axios";
import type { NormalizedError } from "./types";

export const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const ne: NormalizedError = {
      message:
        err?.response?.data?.message ||
        err?.message ||
        "Network error. Please try again.",
      status: err?.response?.status,
      code: err?.code,
    };
    return Promise.reject(ne);
  }
);
