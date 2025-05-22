import { useParams } from "react-router-dom";
import {
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import useProduct from "@/hooks/useProduct.ts";
import noImage from "@/assets/no-image-placeholder.webp";
import CollapsibleContainer from "@/components/CollapsibleContainer.tsx";

const ProductDetailPage = () => {
  const { id } = useParams();

    const { data: product, isLoading, error } = useProduct(parseInt(id!));

  if (isLoading) return <Spinner />;
  if (error || !product) throw error;

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5}>
      <GridItem>
        <Image
          src={product.picturePath || noImage}
          alt={product.name}
          width="500px"
          objectFit="contain"
          margin={10}
        />

      </GridItem>
      <GridItem>
        <Heading>{product.name}</Heading>
        <CollapsibleContainer
          title={"Description"}
          description={product.description}
        />{" "}
      </GridItem>
    </SimpleGrid>
  );
};
export default ProductDetailPage;
