import { useNavigate } from "react-router-dom";
import useAuthStore from "@/authStore";

const AuthButton: React.FC = () => {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const setManualLogout = useAuthStore((state) => state.setManualLogout);
    const navigate = useNavigate();

    const handleLogout = () => {
        setManualLogout(true);
        logout();
        navigate("/login", { replace: true });
    };

    return token ? (
        <button onClick={handleLogout}>Logout</button>
    ) : (
        <button onClick={() => navigate("/login")}>Login</button>
    );
};

export default AuthButton;
