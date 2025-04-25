import CategoryList from "@/components/CategoryList";
import {Box, Grid, GridItem,  useBreakpointValue} from "@chakra-ui/react";
import ProductHeading from "@/components/ProductHeading.tsx";
import ProductGrid from "@/pages/ProductGrid.tsx";

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

          </Box>
            <ProductGrid />
        </GridItem>
      }
    </Grid>
  );
};
export default HomePage;