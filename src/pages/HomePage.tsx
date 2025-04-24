import CategoryList from "@/components/CategoryList";
import {Box, Grid, GridItem, HStack, useBreakpointValue} from "@chakra-ui/react";
import ProductHeading from "@/components/ProductHeading.tsx";

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
      {isLargeScreen && (
        <GridItem area="aside" paddingX={5}>
          <CategoryList />
        </GridItem>
      )}
      {
        <GridItem area="main">
          <Box paddingLeft={5}>
            <ProductHeading />
              <HStack spacing={5}  marginBottom={5}>
                  <SortSelector />
              </HStack>
          </Box>
            <ProductGrid />
        </GridItem>
      }
    </Grid>
  );
};
export default HomePage;