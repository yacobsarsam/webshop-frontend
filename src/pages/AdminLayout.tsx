import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar.tsx";

const AdminLayout = () => {
    const token = localStorage.getItem("token");
    const location = useLocation();

    // Redirect to log in if not authenticated
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <Box>
            <NavBar />
            <Box id="admin-main" padding={5}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;
