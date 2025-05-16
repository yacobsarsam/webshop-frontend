import {
  Button,
  Card,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "@/entities/Product.ts";
import noImage from "../assets/no-image-placeholder.webp";
import useCartStore from "@/hooks/useCartStore";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { addToCart, updateCartItem, getCartItemQuantity } = useCartStore();

  const quantityInCart = getCartItemQuantity(product.id);


  const handleIncrease = () => {
    if (quantityInCart < product.quantity) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }
  };

  const handleDecrease = () => {
    if (quantityInCart > 0) {
      updateCartItem(product.id, quantityInCart - 1);
    }
  };
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
          <Text>
            Availability:{" "}
            {product.quantity === 0
              ? "Sold Out"
              : product.quantity > 10
                ? "10+"
                : product.quantity}
          </Text>{" "}
          {quantityInCart === 0 ? (
            <Button
              colorPalette="blue"
              mt={3}
              onClick={handleIncrease}
              disabled={product.quantity <= 0}
            >
              Buy
            </Button>
          ) : (
            <HStack>
              <Button
                size="sm"
                onClick={handleDecrease}
                disabled={quantityInCart <= 0}
              >
                -
              </Button>
              <Text>{quantityInCart}</Text>
              <Button
                size="sm"
                onClick={handleIncrease}
                disabled={quantityInCart >= product.quantity}
              >
                +
              </Button>
            </HStack>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default ProductCard;
