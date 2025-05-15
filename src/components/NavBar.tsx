import { Flex, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/storeblack.png";
import SearchInput from "@/components/SearchInput.tsx";
import ColorModeSwitch from "./ColorModeSwitch";
import AuthButton from "@/components/AuthButton.tsx";
import Cart from "@/components/Cart.tsx";
import {Link} from "react-router-dom";

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
            <Image src={logo} boxSize="60px" alt="Logo" objectFit={"cover"} borderRadius="5px" />
          </Link>
          <SearchInput />
          <ColorModeSwitch />
        </HStack>
      </Flex>
    </>
  );
};

export default NavBar;
