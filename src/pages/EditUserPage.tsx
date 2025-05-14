import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Spinner,
  Heading,
  Field,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import useUser from "@/hooks/useUser";
import useUpdateUser from "@/hooks/useUpdateUser";

const roles = createListCollection({
  items: [
    { label: "Admin", value: "ADMIN" },
    { label: "User", value: "USER" },
  ],
});

const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user, isLoading, error } = useUser(parseInt(id!));
  const { mutate: updateUser } = useUpdateUser();

  const [formData, setFormData] = useState<{
    id: number;
    email: string;
    role: "USER" | "ADMIN";
  }>({
    id: 0,
    email: "",
    role: "USER",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRoleChange = (details: { value: string[] }) => {
    setFormData((prev) => ({
      ...prev,
      role: details.value[0] as "USER" | "ADMIN", // Extract the first value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, role } = formData;
    if (!email || !role) {
      toaster.create({
        title: "Missing or invalid fields.",
        description: "Please fill in all required fields with valid values.",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }

    updateUser(formData, {
      onSuccess: () => {
        toaster.create({
          title: "User updated.",
          description: `User "${formData.email}" was successfully updated.`,
          type: "success",
          duration: 3000,
          closable: true,
        });
        alert("User updated successfully.");
        navigate("/admin/users");
      },
      onError: () => {
        toaster.create({
          title: "Update failed.",
          description: `Could not update "${formData.email}". Please try again.`,
          type: "error",
          duration: 3000,
          closable: true,
        });
        alert(`Could not update "${formData.email}". Please try again.`);
      },
    });
  };

  if (isLoading) return <Spinner />;
  if (error || !user) return <p>Error loading user details.</p>;

  const isValid =
    formData.email.trim() !== "" &&
    (formData.role === "ADMIN" || formData.role === "USER");

  return (
    <Box maxW="600px" mx="auto" mt={10}>
      <Heading mb={6}>Edit User</Heading>
      <form onSubmit={handleSubmit}>
        <Field.Root mb={4}>
          <Field.Label htmlFor="email">User Email</Field.Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter user email"
          />
        </Field.Root>
        <Field.Root mb={4}>
          <Field.Label>Role</Field.Label>
          <Select.Root
            collection={roles}
            value={[formData.role]} // Wrap the role in an array
            onValueChange={(details) => handleRoleChange(details)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select role" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {roles.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Field.Root>
        <Button type="submit" colorScheme="blue" disabled={!isValid}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditUserPage;
