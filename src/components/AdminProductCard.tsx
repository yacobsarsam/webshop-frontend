import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "@/entities/Product.ts";
import noImage from "../assets/no-image-placeholder.webp";

interface Props {
  product: Product;
}
export const ProductCard = ({ product }: Props) => {
  return (
    <Card.Root>
      <Image
        src={product.picturePath || noImage}
        //alt={product.name}
        height='250px'
        objectFit="contain"
      />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}></HStack>
        <Heading fontSize={"2xl"}>
          <Link to={"/products/" + product.id}> {product.name} </Link>
        </Heading>
      </CardBody>
    </Card.Root>
  );
};
export default ProductCard;
