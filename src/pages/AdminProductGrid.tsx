import { Spinner, Text, Table } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminProductCard from "@/components/AdminProductRow.tsx"; // a single row renderer
import { useProducts } from "@/hooks/useProducts";

const AdminProductGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage, refetch } = useProducts();

  if (error) return <Text>{error.message}</Text>;

  const fetchedProductCount =
    data?.pages.reduce((acc, page) => acc + page.content.length, 0) || 0;

    const handleProductDeleted = () => {
        refetch(); // Re-fetch the product list after a product is deleted
    };

  return (
    <InfiniteScroll
      dataLength={fetchedProductCount}
      hasMore={!!hasNextPage}
      next={fetchNextPage}
      loader={<Spinner />}
    >
      <Table.Root colorScheme="gray" size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Image</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? null // You can show a spinner or skeleton rows here if needed
            : data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.content.map((product) => (
                    <AdminProductCard
                      key={product.id}
                      product={product}
                      onProductDeleted={handleProductDeleted}
                    />
                  ))}
                </React.Fragment>
              ))}
        </Table.Body>
      </Table.Root>
    </InfiniteScroll>
  );
};

export default AdminProductGrid;
