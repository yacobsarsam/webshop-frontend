import CategoryList from "@/components/CategoryList";
import {Grid, GridItem,  useBreakpointValue} from "@chakra-ui/react";

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
          <CategoryList />
      </GridItem>}
      {
          /*     </ GridItem>}
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
