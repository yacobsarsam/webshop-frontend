import { HStack, Text} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode"
import { ColorModeButton } from "@/components/ui/color-mode"

const ColorModeSwitch = () => {
    const {toggleColorMode}= useColorMode();
    return(
        <HStack>
            <ColorModeButton colorPalette={"green"}  onClick={toggleColorMode}/>
            <Text whiteSpace={"nowrap"}>Dark mode</Text>
        </HStack>
    );
}
export default ColorModeSwitch;