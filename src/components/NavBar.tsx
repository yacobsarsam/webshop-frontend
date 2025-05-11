import { HStack, Image } from "@chakra-ui/react";
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
    <HStack padding={10}>
      <Link to={linkPath}>
        <Image src={logo} boxSize="60px" alt="Logo" objectFit={"cover"} />
      </Link>
      <SearchInput />
      <ColorModeSwitch></ColorModeSwitch>
      {linkPath === "/admin" && <AuthButton />}{" "}
    </HStack>
  );
};

export default NavBar;
