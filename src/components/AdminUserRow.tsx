import { Button, Table, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import ConfirmDialog from "@/components/ConfirmDialog.tsx";
import useDeleteUser from "@/hooks/useDeleteUser";
import User from "@/entities/User.ts";

interface Props {
  user: User;
  onUserDeleted: () => void;
}

const AdminUserRow = ({ user, onUserDeleted }: Props) => {
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = () => {
    if (!user.id) return;
    console.log("deleted user: " + deleteUser);
    deleteUser(user.id, {
      onSuccess: () => {
        toaster.create({
          title: "User deleted.",
          description: `User "${user.email}" was successfully deleted.`,
          type: "success",
          duration: 3000,
        });
        alert(`User with name ${user.email} deleted successfully.`);
        console.log(`User with ID ${user.id} deleted successfully.`);
        onUserDeleted();
      },
      onError: (err) => {
        toaster.create({
          title: "Failed to delete User.",
          description: `Could not delete "${user.email}". Please try again.`,
          duration: 3000,
          type: "error",
        });
        console.error("Error deleting User:", err);
        alert(`Could not delete "${user.email}". Please try again.`);
      },
    });
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Link to={`/users/${user.id}`}>{user.email}</Link>
      </Table.Cell>
      <Table.Cell>
        <Link to={`/users/${user.id}`}>{user.role}</Link>
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2} justifyContent={"flex-end"}>
          <Link to={`/admin/users/edit/${user.id}`}>
            <Button colorPalette="green" size="sm">
              Edit
            </Button>
          </Link>{" "}
          <ConfirmDialog
            title="Delete User"
            message={`Are you sure you want to delete "${user.email}"?`}
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
export default AdminUserRow;
