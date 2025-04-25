import {Box} from "@chakra-ui/react";
import {ReactNode} from "react";

interface Props {
    children:ReactNode;
}
const ProductCardContainer = ({children}:Props) => {

    return(
        <Box borderRadius={10} overflow={"hidden"}
             _hover={{ transform: "scale(1.05)" }}
             transition="transform 0.2s">
            {children}
        </Box>
    )
}
export default ProductCardContainer;