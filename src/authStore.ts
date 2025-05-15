import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  email: string | null;
  role: string | null;
  manualLogout: boolean;
  login: (token: string, email: string, role: string) => void;
  logout: () => void;
  setManualLogout: (flag: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      role: null,
      manualLogout: false,
      login: (token, email, role) =>
        set({ token, email, role, manualLogout: false }),
      logout: () =>
        set({ token: null, email: null, role: null, manualLogout: true }),
      setManualLogout: (flag) => set({ manualLogout: flag }),
    }),
    { name: "auth" },
  ),
);

export default useAuthStore;
