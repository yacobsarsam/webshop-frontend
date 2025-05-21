import { Text } from "@chakra-ui/react";

interface Props {
    price: number;
}

const PriceDisplay = ({ price }: Props) => {
    return <Text fontSize="lg" fontWeight="bold">${price.toFixed(2)}</Text>;
};

export default PriceDisplay;