import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import Category from "@/entities/Category.ts";

const apiClient = new APIClient<Category>("/category");

const useUpdateCategory = () =>
  useMutation({
    mutationFn: (category: Category) => apiClient.put(category.id!, category),
  });

export default useUpdateCategory;