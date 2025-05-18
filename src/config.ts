export const BASE_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_BASE_URL
        : import.meta.env.VITE_PROD_BASE_URL;
