import axios from "axios";

import { env } from "@/lib/env";
import { setupInterceptors } from "./interceptors";

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

setupInterceptors(apiClient);
