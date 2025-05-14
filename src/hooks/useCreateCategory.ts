import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import Category from "@/entities/Category.ts";

const apiClient = new APIClient<Category>("/category");

const useCreateCategory = () =>
  useMutation({
    mutationFn: (category: Category) => apiClient.post(category),
  });

export default useCreateCategory;
