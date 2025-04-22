import { extendTheme, ThemingConfig } from "@chakra-ui/react";

const config: ThemingConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    styles: {
        global: (props: any) => ({
            body: {
                bg: props.colorMode === "dark" ? "gray.800" : "white",
                color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
            },
        }),
    },
});
export default theme;