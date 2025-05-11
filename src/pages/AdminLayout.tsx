import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar.tsx";
import useAuthStore from "@/authStore.ts";

const AdminLayout = () => {
  // Redirect to log in if not authenticated
  const location = useLocation();

  const token = useAuthStore((state) => state.token); // ✅ This is correct

  if (!token) {
    return (
      <Navigate
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }
  return (
    <Box>
      <NavBar linkPath={"/admin"} />
      <Box id="admin-main" padding={5}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default AdminLayout;
