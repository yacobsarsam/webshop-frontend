import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import Category from "@/entities/Category.ts";

const apiClient = new APIClient<Category>("/category");

const useDeleteCategory = () =>
  useMutation({
    mutationFn: (id: number) => apiClient.delete(id),
  });

export default useDeleteCategory;
