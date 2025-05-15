import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import SearchInput from "@/components/SearchInput.tsx";
import ColorModeSwitch from "./ColorModeSwitch";
import AuthButton from "@/components/AuthButton.tsx";
import Cart from "@/components/Cart.tsx";

interface NavBarProps {
  linkPath: string;
}
const NavBar = ({ linkPath }: NavBarProps) => {
  return (
    <>
      <Flex direction="column" padding={10}>
        <Flex justifyContent="flex-end" width="100%">
          {linkPath === "/" && <Cart />}
          {linkPath === "/admin" && <AuthButton />}
        </Flex>
        <HStack>
          <Link to={linkPath}>
            <Image src={logo} boxSize="60px" alt="Logo" objectFit={"cover"} />
          </Link>
          <SearchInput />
          <ColorModeSwitch />
        </HStack>
      </Flex>

      {linkPath === "/admin" && (
        <Flex justifyContent="flex-end" mb={4} gap={4} px={10}>
          <Link to="/admin/categories/">
            <Button colorPalette="blue" size="sm">
              Categories
            </Button>
          </Link>

          <Link to="/admin/users/">
            <Button colorPalette="blue" size="sm">
              Users
            </Button>
          </Link>
          <Link to="/admin">
            <Button colorPalette="blue" size="sm">
              Products
            </Button>
          </Link>
        </Flex>
      )}
    </>
  );
};

export default NavBar;
