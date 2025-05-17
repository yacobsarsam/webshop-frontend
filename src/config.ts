export const BASE_URL =
    process.env.NODE_ENV === "development"
        ? process.env.DEV_BASE_URL
        : process.env.PROD_BASE_URL;