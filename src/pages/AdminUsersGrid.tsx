import { Text, Table, Spinner, Flex, Button } from "@chakra-ui/react";
import useUsers from "@/hooks/useUsers.ts";
import { Link } from "react-router-dom";
import AdminUserRow from "@/components/AdminUserRow.tsx";

const AdminUsersGrid = () => {
  const { data, error, isLoading, refetch } = useUsers();

  if (error) return <Text>{error.message}</Text>;

  const handleUserDeleted = () => {
    refetch();
  };

  return (
    <Table.Root colorPalette="gray" size="md">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>E-mail</Table.ColumnHeader>
          <Table.ColumnHeader>Role</Table.ColumnHeader>

          <Table.ColumnHeader>
            <Flex justifyContent="end">
              <Link to="/admin/users/register">
                <Button colorPalette="blue" size="sm">
                  Add User
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
          data?.content.map((user) => (
            <AdminUserRow
              key={user.id}
              user={user}
              onUserDeleted={handleUserDeleted}
            />
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
};

export default AdminUsersGrid;
