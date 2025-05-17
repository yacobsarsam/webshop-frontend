import { Box, Tabs } from "@chakra-ui/react";
import { Navigate, useLocation, useNavigate, Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar.tsx";
import useAuthStore from "@/authStore.ts";
import { BiUser, BiCategory, BiLogoProductHunt } from "react-icons/bi";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);

  if (!token) {
    return (
      <Navigate
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  const currentTab = (() => {
    if (location.pathname.startsWith("/admin/categories")) return "categories";
    if (location.pathname === "/admin") return "products";
    if (location.pathname.startsWith("/admin/users")) return "users";
    return "products";
  })();

  const handleTabChange = (details: { value: string }) => {
    const { value } = details;
    switch (value) {
      case "categories":
        navigate("/admin/categories");
        break;
      case "products":
        navigate("/admin");
        break;
      case "users":
        navigate("/admin/users");
        break;
    }
  };

  return (
    <Box>
      <NavBar linkPath="/admin" />
      <Box px={10} mt={6}>
        <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
          <Tabs.List gap="2" display="flex" justifyContent="center" mb="4">
            {" "}
            <Tabs.Trigger
              value="products"
              px="4"
              py="2"
              borderRadius="md"
              bg={currentTab === "products" ? "blue.600" : "gray.200"}
              color={currentTab === "products" ? "white" : "gray.800"}
              _hover={{ bg: "blue.400", color: "white" }}
              fontWeight="medium"
            >
              <BiLogoProductHunt />
              Products
            </Tabs.Trigger>
            <Tabs.Trigger
              value="categories"
              px="4"
              py="2"
              borderRadius="md"
              bg={currentTab === "categories" ? "blue.600" : "gray.200"}
              color={currentTab === "categories" ? "white" : "gray.800"}
              _hover={{ bg: "blue.400", color: "white" }}
              fontWeight="medium"
            >
              <BiCategory />
              Categories
            </Tabs.Trigger>
            {role === "ADMIN" && (
              <Tabs.Trigger
                value="users"
                px="4"
                py="2"
                borderRadius="md"
                bg={currentTab === "users" ? "blue.600" : "gray.200"}
                color={currentTab === "users" ? "white" : "gray.800"}
                _hover={{ bg: "blue.400", color: "white" }}
                fontWeight="medium"
              >
                <BiUser />
                Users
              </Tabs.Trigger>
            )}
            <Tabs.Indicator mt="-2px" height="2px" borderRadius="full" />
          </Tabs.List>

          <Tabs.Content value="products">
            {/* Your product tab content */}
          </Tabs.Content>
          <Tabs.Content value="categories">
            {/* Your category tab content */}
          </Tabs.Content>
          {role === "ADMIN" && (
            <Tabs.Content value="users">
              {/* Your user tab content */}
            </Tabs.Content>
          )}
        </Tabs.Root>

        <Box mt={6}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
