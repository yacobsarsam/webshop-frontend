import { useLocation, Navigate } from "react-router-dom";
import useAuthStore from "@/authStore";
import { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
  requiredRole?: string;
}

const RequireAuth = ({ children, requiredRole }: RequireAuthProps) => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();
  const role = localStorage.getItem("role"); // Retrieve role from localStorage

  if (!token) {
    return (
      <Navigate
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }
  if (requiredRole && role !== requiredRole) {
    return <div>Access Denied: You do not have the required permissions.</div>;
  }

  return <>{children}</>;
};

export default RequireAuth;
