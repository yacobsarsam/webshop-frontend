import { Button, Table, Image, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "@/entities/Product.ts";
import noImage from "../assets/no-image-placeholder.webp";

interface Props {
  product: Product;
}

const AdminProductRow = ({ product }: Props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Image
          src={product.picturePath || noImage}
          boxSize="80px"
          objectFit="contain"
          alt={product.name}
        />
      </Table.Cell>
      <Table.Cell>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="sm" color="gray.600">
          {product.description}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2} justifyContent={"flex-end"}>
          <Link to={`/edit/${product.id}`}>
            <Button colorPalette="green" size="sm">
              Edit
            </Button>
          </Link>
          <Link to={`/delete/${product.id}`}>
            <Button colorPalette="red" size="sm">
              Delete
            </Button>
          </Link>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};
export default AdminProductRow;
