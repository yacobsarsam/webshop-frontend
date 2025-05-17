import React, { useState } from "react";
import { Box, Button, Input, Heading, Field, Spinner } from "@chakra-ui/react";
import useCreateCategory from "@/hooks/useCreateCategory";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import Category from "@/entities/Category.ts";
import PageButton from "@/components/PageButton.tsx";

const AddCategoryPage = () => {
  const { mutate: createCategory, status } = useCreateCategory();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Category>({
    id: 0,
    name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    createCategory(formData, {
      onSuccess: () => {
        toaster.create({
          title: "Category created.",
          description: `Category "${formData.name}" was successfully created.`,
          type: "success",
          duration: 3000,
          closable: true,
        });
        alert("Category added successfully!");
        navigate("/admin");
      },
      onError: () => {
        toaster.create({
          title: "Creation failed.",
          description: `Could not create "${formData.name}". Please try again.`,
          type: "error",
          duration: 3000,
          closable: true,
        });
      },
    });
  };

  const isValid = formData.name.trim() !== "";

  return (
    <Box maxW="600px" mx="auto" mt={10}>
      <Heading mb={6}>Add New Category</Heading>
      <form onSubmit={handleSubmit}>
        <Field.Root mb={4}>
          <Field.Label htmlFor="name">Category Name</Field.Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Category name"
          />
        </Field.Root>

        <Button type="submit" colorPalette="blue" disabled={!isValid}>
          {status === "pending" ? <Spinner size="sm" /> : "Add Category"}
        </Button>
        <PageButton btnName={"Cancel"} navigateTo={"/admin/categories/"} />
      </form>
    </Box>
  );
};

export default AddCategoryPage;
