import {Grid, GridItem, Text, useBreakpointValue} from "@chakra-ui/react";

const HomePage = () => {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      {isLargeScreen && <GridItem area="aside" paddingX={5}>
          <text>side</text>
      </GridItem>}
<Text>fwwefewf</Text>
      {/* <GenreList />
            </ GridItem>}
            <GridItem area="main">
                <Box paddingLeft={5}>
                    <GameHeading />
                    <HStack spacing={5}  marginBottom={5}>
                        <PlatformSelector />
                        <SortSelector />
                    </HStack>
                </Box>
                <GameGrid />
            </ GridItem> */}
    </Grid>
  );
};
export default HomePage;
