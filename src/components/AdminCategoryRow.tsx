import { Button, Table, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import Category from "@/entities/Category.ts";
import ConfirmDialog from "@/components/ConfirmDialog.tsx";
import useDeleteCategory from "@/hooks/useDeleteCategory";

interface Props {
  category: Category;
  onCategoryDeleted: () => void;
}

const AdminCategoryRow = ({ category, onCategoryDeleted }: Props) => {
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = () => {
    if (!category.id) return;
    console.log("deleted category: " + deleteCategory);
    deleteCategory(category.id, {
      onSuccess: () => {
        toaster.create({
          title: "Category deleted.",
          description: `Category "${category.name}" was successfully deleted.`,
          type: "success",
          duration: 3000,
        });
        alert(`Category with name ${category.name} deleted successfully.`);
        console.log(`Category with ID ${category.id} deleted successfully.`);
        onCategoryDeleted();
      },
      onError: (err) => {
        toaster.create({
          title: "Failed to delete Category.",
          description: `Could not delete "${category.name}". Please try again.`,
          duration: 3000,
          type: "error",
        });
        console.error("Error deleting Category:", err);
        alert(`Could not delete "${category.name}". Please try again.`);
      },
    });
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Link to={`/Category/${category.id}`}>{category.name}</Link>
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2} justifyContent={"flex-end"}>
          <Link to={`/admin/categories/edit/${category.id}`}>
            <Button colorPalette="green" size="sm">
              Edit
            </Button>
          </Link>{" "}
          <ConfirmDialog
            title="Delete Category"
            message={`Are you sure you want to delete "${category.name}"?`}
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
export default AdminCategoryRow;
