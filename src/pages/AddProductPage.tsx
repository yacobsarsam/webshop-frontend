import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Heading,
  Field,
  Spinner,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import useCreateProduct from "@/hooks/useCreateProduct";
import useCategories from "@/hooks/useCategories";
import Product from "@/entities/Product";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import PageButton from "@/components/PageButton.tsx";

const AddProductPage = () => {
  const { mutate: createProduct, status } = useCreateProduct();
  const { data: categories } = useCategories();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    picturePath: "",
    categoryId: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" ? parseFloat(value) : value,
    }));
  };

  const handleCategoryChange = (details: { value: string[] }) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: parseInt(details.value[0]),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, description, price, quantity, categoryId } = formData;

    if (!name || !description || price < 0 || quantity < 0 || categoryId <= 0) {
      toaster.create({
        title: "Missing or invalid fields.",
        description: "Please fill in all required fields with valid values.",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }

    createProduct(
      { product: formData },
      {
        onSuccess: () => {
          toaster.create({
            title: "Product created.",
            description: `Product "${formData.name}" was successfully created.`,
            type: "success",
            duration: 3000,
            closable: true,
          });
          alert("Product added successfully!");
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
      },
    );
  };

  const isValid =
    formData.name.trim() !== "" &&
    formData.description.trim() !== "" &&
    formData.price > 0 &&
    formData.quantity >= 0 &&
    formData.categoryId > 0;

  const categoryCollection = createListCollection({
    items:
      categories?.content.map((cat) => ({
        label: cat.name,
        value: cat.id.toString(),
      })) || [],
  });

  return (
    <Box maxW="600px" mx="auto" mt={10}>
      <Heading mb={6}>Add New Product</Heading>
      <form onSubmit={handleSubmit}>
        <Field.Root mb={4}>
          <Field.Label htmlFor="name">Product Name</Field.Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </Field.Root>
        <Field.Root mb={4}>
          <Field.Label htmlFor="description">Description</Field.Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description ?? ""}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </Field.Root>
        <Field.Root mb={4}>
          <Field.Label htmlFor="picturePath">Picture Path</Field.Label>
          <Textarea
            id="picturePath"
            name="picturePath"
            value={formData.picturePath ?? ""}
            onChange={handleChange}
            placeholder="Enter product picture path"
          />
        </Field.Root>
        <Field.Root mb={4}>
          <Field.Label htmlFor="price">Price</Field.Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
        </Field.Root>
        <Field.Root mb={4}>
          <Field.Label htmlFor="quantity">Quantity</Field.Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter product quantity"
          />
        </Field.Root>
        <Field.Root mb={4}>
          <Field.Label>Category</Field.Label>
          <Select.Root
            collection={categoryCollection}
            value={[formData.categoryId.toString()]}
            onValueChange={(details) => handleCategoryChange(details)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select category" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {categoryCollection.items.map((item) => (
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
        <Button type="submit" colorPalette="blue" disabled={!isValid}>
          {status === "pending" ? <Spinner size="sm" /> : "Add Product"}
        </Button>
        <PageButton btnName={"Cancel"} navigateTo={"/admin/"} />
      </form>
    </Box>
  );
};

export default AddProductPage;
