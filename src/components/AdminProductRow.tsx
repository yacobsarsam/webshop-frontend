import { Button, Table, Image, Text, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

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
    console.log("deleted product: " + deleteProduct);
    deleteProduct(product.id, {
      onSuccess: () => {
        toaster.create({
          title: "Product deleted.",
          description: `Product "${product.name}" was successfully deleted.`,
          type: "success",
          duration: 3000,
        });
        alert(`Product with name ${product.name} deleted successfully.`);
        console.log(`Product with ID ${product.id} deleted successfully.`);
        onProductDeleted();
      },
      onError: (err) => {
        toaster.create({
          title: "Failed to delete product.",
          description: `Could not delete "${product.name}". Please try again.`,
          duration: 3000,
          type: "error",
        });
        console.error("Error deleting product:", err);
        alert(`Could not delete "${product.name}". Please try again.`);
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
            <Text fontSize="sm" color="gray.600">
                {product.categoryId}
            </Text>
        </Table.Cell>
      <Table.Cell>
        <Flex gap={2} justifyContent={"flex-end"}>
            <Link to={`/admin/products/edit/${product.id}`}>            <Button colorPalette="green" size="sm">
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
