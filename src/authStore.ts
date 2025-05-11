import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    token: string | null;
    manualLogout: boolean;
    login: (token: string) => void;
    logout: () => void;
    setManualLogout: (flag: boolean) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            manualLogout: false,
            login: (token) => set({ token, manualLogout: false }), // reset flag on login
            logout: () => set({ token: null, manualLogout: true }),
            setManualLogout: (flag) => set({ manualLogout: flag }),
        }),
        { name: "auth" }
    )
);

export default useAuthStore;
