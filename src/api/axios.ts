import axios, { AxiosError } from "axios";
import type { NormalizedError } from "@api/types";

export const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
  timeout: 15_000,
});

api.interceptors.response.use(
  (r) => r,
  (e: AxiosError) => Promise.reject(e)
);

export function toNormalizedError(e: unknown): NormalizedError {
  if (axios.isAxiosError(e)) {
    const status = e.response?.status ?? 0;

    let message = e.message || "Unexpected error";
    const data: unknown = e.response?.data;
    if (typeof data === "string") {
      message = data;
    } else if (data && typeof (data as any).message === "string") {
      message = (data as any).message as string;
    }

    return {
      code: String(status || "AXIOS_ERROR"),
      message,
      details: {
        url: e.config?.url,
        method: e.config?.method,
        data: e.response?.data,
      },
    };
  }
  return { code: "UNKNOWN", message: "Unexpected error", details: e };
}
