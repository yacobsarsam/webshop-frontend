import { useLocation, Navigate } from "react-router-dom";
import useAuthStore from "@/authStore";
import { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return (
        <Navigate
            to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
            replace
        />
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
