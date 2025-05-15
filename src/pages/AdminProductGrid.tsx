import { Spinner, Text, Table, Button, Flex } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminProductCard from "@/components/AdminProductRow.tsx"; // a single row renderer
import { useProducts } from "@/hooks/useProducts";
import { Link } from "react-router-dom";
import React from "react";

const AdminProductGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage, refetch } =
    useProducts();

  if (error) return <Text>{error.message}</Text>;

  const fetchedProductCount =
    data?.pages.reduce((acc, page) => acc + page.content.length, 0) || 0;

  const handleProductDeleted = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Error during refetch:", error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={fetchedProductCount}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={<Spinner />}
    >
      <Table.Root colorPalette="gray" size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Image</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Category ID</Table.ColumnHeader>
            <Table.ColumnHeader>
              <Flex justifyContent="flex-end">
                <Link to="/admin/products/add">
                  <Button colorPalette="blue" size="sm">
                    Add Product
                  </Button>
                </Link>
              </Flex>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={4}>
                <Flex justifyContent="center">
                  <Spinner />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ) : (
            data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.content.map((product) => (
                  <AdminProductCard
                    key={product.id}
                    product={product}
                    onProductDeleted={handleProductDeleted}
                  />
                ))}
              </React.Fragment>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </InfiniteScroll>
  );
};

export default AdminProductGrid;
