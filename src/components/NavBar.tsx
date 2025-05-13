import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import SearchInput from "@/components/SearchInput.tsx";
import ColorModeSwitch from "./ColorModeSwitch";
import AuthButton from "@/components/AuthButton.tsx";

interface NavBarProps {
  linkPath: string;
}
const NavBar = ({ linkPath }: NavBarProps) => {
  return (
    <>
      <HStack padding={10}>
        <Link to={linkPath}>
          <Image src={logo} boxSize="60px" alt="Logo" objectFit={"cover"} />
        </Link>
        <SearchInput />
        <ColorModeSwitch></ColorModeSwitch>
        {linkPath === "/admin" && <AuthButton />}
      </HStack>

        {linkPath === "/admin" && <Flex justifyContent="flex-end" mb={4} gap={4}>
        <Link to="/admin/categories/">
          <Button colorPalette="blue" size="sm">
            Categories
          </Button>
        </Link>

        <Link to="/admin/users/register">
          <Button colorPalette="blue" size="sm">
            Users
          </Button>
        </Link>
        <Link to="/admin/products/add">
          <Button colorPalette="blue" size="sm">
            Add Product
          </Button>
        </Link>
      </Flex>}
    </>
  );
};

export default NavBar;
