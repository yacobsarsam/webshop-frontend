import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Input, Spinner, Heading, Field } from "@chakra-ui/react";
import useUpdateCategory from "@/hooks/useUpdateCategory";
import { toaster } from "@/components/ui/toaster";
import useCategory from "@/hooks/useCategory.ts";
import Category from "@/entities/Category.ts";

const EditCategoryPage = () => {
  const { id } = useParams();
  const { category, isLoading, error } = useCategory(parseInt(id!));
  const { mutate: updateCategory } = useUpdateCategory();

  const [formData, setFormData] = useState<Category>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" || name === "categoryId"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name } = formData;

    if (!name) {
      toaster.create({
        title: "Missing or invalid fields.",
        description: "Please fill in all required fields with valid values.",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }

    updateCategory(formData, {
      onSuccess: () => {
        toaster.create({
          title: "Category updated.",
          description: `Category "${formData.name}" was successfully updated.`,
          type: "success",
          duration: 3000,
          closable: true,
        });
      },
      onError: () => {
        toaster.create({
          title: "Update failed.",
          description: `Could not update "${formData.name}". Please try again.`,
          type: "error",
          duration: 3000,
          closable: true,
        });
      },
    });
  };

  if (isLoading) return <Spinner />;
  if (error || !category) return <p>Error loading category details.</p>;

  const isValid = formData.name.trim() !== "";

  return (
    <Box maxW="600px" mx="auto" mt={10}>
      <Heading mb={6}>Edit Category</Heading>
      <form onSubmit={handleSubmit}>
        <Field.Root mb={4}>
          <Field.Label htmlFor="name">Category Name</Field.Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
          />
        </Field.Root>
        <Button type="submit" colorPalette="blue" disabled={!isValid}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditCategoryPage;
