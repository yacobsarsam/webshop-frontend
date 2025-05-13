import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import Product from "@/entities/Product";

const apiClient = new APIClient<Product>("/category");

const useDeleteCategory = () =>
  useMutation({
    mutationFn: (id: number) => apiClient.delete(id),
  });

export default useDeleteCategory;
