import { Button, HStack, Text } from "@chakra-ui/react";

interface Props {
    quantityInCart: number;
    productQuantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const CartControls = ({
  quantityInCart,
  productQuantity,
  onIncrease,
  onDecrease,
}: Props) => {
  return quantityInCart === 0 ? (
    <Button
      colorPalette="blue"
      mt={3}
      onClick={onIncrease}
      disabled={productQuantity <= 0}
    >
      Buy
    </Button>
  ) : (
    <HStack>
      <Button
        size="sm"
        colorPalette="blue"
        onClick={onDecrease}
        disabled={quantityInCart <= 0}
      >
        -
      </Button>
      <Text>{quantityInCart}</Text>
      <Button
        size="sm"
        colorPalette="blue"
        onClick={onIncrease}
        disabled={quantityInCart >= productQuantity}
      >
        +
      </Button>
    </HStack>
  );
};

export default CartControls;