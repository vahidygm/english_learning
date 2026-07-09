export const env = {
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8083",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "English Learning",
  IS_DEV: process.env.NODE_ENV === "development",
  IS_PROD: process.env.NODE_ENV === "production",
} as const;
