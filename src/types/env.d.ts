interface ImportMetaEnv {
    readonly MODE: string;
    readonly VITE_API_URL: string;
    readonly VITE_DEV_BASE_URL: string;
    readonly VITE_PROD_BASE_URL: string;
    readonly VITE_OTHER_ENV_VAR: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}