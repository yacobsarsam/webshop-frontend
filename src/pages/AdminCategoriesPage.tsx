import { Text, Table } from "@chakra-ui/react";
import AdminCategoryCard from "@/components/AdminCategoryRow.tsx"; // a single row renderer
import useCategories from "@/hooks/useCategories.ts";

const AdminCategoryGrid = () => {
  const { data, error, isLoading, refetch } = useCategories();

  if (error) return <Text>{error.message}</Text>;

  const handleCategoryDeleted = () => {
    refetch();
  };

  return (
    <>
      <Table.Root colorPalette="gray" size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? null // You can show a spinner or skeleton rows here if needed
            : data?.content.map((category) => (
                <AdminCategoryCard
                  key={category.id}
                  category={category}
                  onCategoryDeleted={handleCategoryDeleted}
                />
              ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default AdminCategoryGrid;
