import { Button, Table, Image, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "@/entities/Product.ts";
import noImage from "../assets/no-image-placeholder.webp";
import ConfirmDialog from "@/components/ConfirmDialog.tsx";
import useDeleteProduct from "@/hooks/useDeleteProduct";

interface Props {
  product: Product;
  onProductDeleted: () => void;
}

const AdminProductRow = ({ product, onProductDeleted }: Props) => {
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDelete = () => {
    if (!product.id) return;

    deleteProduct(product.id, {
      onSuccess: () => {
        console.log(`Product with ID ${product.id} deleted successfully.`);
          onProductDeleted();      },
      onError: (err) => {
        console.error("Error deleting product:", err);
      },
    });
  };

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
          </Link>{" "}
          <ConfirmDialog
            title="Delete Product"
            message={`Are you sure you want to delete "${product.name}"?`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleDelete}
            trigger={
              <Button colorPalette="red" size="sm">
                Delete
              </Button>
            }
          />
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};
export default AdminProductRow;
