import { Card, Heading, Image, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "@/entities/Product.ts";
import noImage from "../assets/no-image-placeholder.webp";
import PriceDisplay from "./PriceDisplay";
import QuantityDisplay from "@/components/QuantityDisplay.tsx";
import CartControls from "@/components/CartControls.tsx";
import useCartActions from "@/hooks/useCartActions";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { quantityInCart, handleIncrease, handleDecrease } = useCartActions(product);
  return (
    <Card.Root>
      <Image
        src={product.picturePath || noImage}
        height="250px"
        objectFit="contain"
      />
      <Card.Body>
        <VStack align="stretch" gap={3}>
          <Heading fontSize={"2xl"}>
            <Link to={"/products/" + product.id}> {product.name} </Link>
          </Heading>
          <PriceDisplay price={product.price} />
          <QuantityDisplay quantity={product.quantity} />
          <CartControls
            quantityInCart={quantityInCart}
            productQuantity={product.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default ProductCard;
