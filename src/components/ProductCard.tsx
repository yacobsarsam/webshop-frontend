import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "@/entities/Product.ts";

interface Props {
  product: Product;
}
export const productCard = ({ product }: Props) => {
  return (
    <Card.Root>
      <Image src={product.picturePath}></Image>
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}></HStack>
        <Heading fontSize={"2xl"}>
          <Link to={"/products/" + product.id}> {product.name} </Link>
        </Heading>
      </CardBody>
    </Card.Root>
  );
};
export default productCard;
