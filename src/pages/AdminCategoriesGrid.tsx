import { Text, Table, Spinner, Flex, Button } from "@chakra-ui/react";
import useCategories from "@/hooks/useCategories.ts";
import { Link } from "react-router-dom";
import AdminCategoryRow from "@/components/AdminCategoryRow.tsx";

const AdminCategoriesGrid = () => {
  const { data, error, isLoading, refetch } = useCategories();

  if (error) return <Text>{error.message}</Text>;

  const handleCategoryDeleted = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Error during refetch:", error);
    }
  };

  return (
    <>
      <Table.Root colorPalette="gray" size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>
              <Flex justifyContent="end">
                <Link to="/admin/categories/add">
                  <Button colorPalette="blue" size="sm">
                    Add Category
                  </Button>
                </Link>
              </Flex>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={2}>
                <Flex justifyContent="center">
                  <Spinner />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ) : (
            data?.content.map((category) => (
              <AdminCategoryRow
                key={category.id}
                category={category}
                onCategoryDeleted={handleCategoryDeleted}
              />
            ))
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default AdminCategoriesGrid;
