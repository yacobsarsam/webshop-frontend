import { Text as ChakraText } from "@chakra-ui/react";

interface Props {
  quantity: number;
}

const QuantityDisplay = ({ quantity }: Props) => {
  return (
    <ChakraText>
      Availability:{" "}
      {quantity === 0 ? "Sold Out" : quantity > 10 ? "10+" : quantity}
    </ChakraText>
  );
};

export default QuantityDisplay;
