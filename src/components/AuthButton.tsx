import { useNavigate } from "react-router-dom";
import useAuthStore from "@/authStore";
import { Button } from "@chakra-ui/react";

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
    <Button onClick={handleLogout} bg="green.600" color="white">
      Logout
    </Button>
  ) : (
    <Button onClick={() => navigate("/login")} bg="green.600" color="white">
      Login
    </Button>
  );
};

export default AuthButton;
