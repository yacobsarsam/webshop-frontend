import CategoryList from "@/components/CategoryList";
import {
  Box,
  Button,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import ProductHeading from "@/components/ProductHeading.tsx";
import ProductGrid from "@/pages/ProductGrid.tsx";
import SortSelector from "@/components/SortSelector.tsx";
import { useNavigate } from "react-router-dom";
import ResetFilters from "@/components/ResetFilters.ts";
import { LuX } from "react-icons/lu";

const HomePage = () => {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  const navigate = useNavigate();

  const handleLogoClick = () => {
    ResetFilters(); // Reset filters when on the home page
    navigate("/"); // Navigate to the home page
  };

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
            <Box display="flex" alignItems="center" gap={4}>
              <SortSelector />
              <Button onClick={handleLogoClick} bg="red.500" color="white" cursor="pointer">
                <LuX />
                Clear filters
              </Button>
            </Box>
          </Box>
          <ProductGrid />
        </GridItem>
      }
    </Grid>
  );
};
export default HomePage;
