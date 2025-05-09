import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import Product from "@/entities/Product";

const apiClient = new APIClient<Product>("/products");

const useDeleteProduct = () =>
  useMutation({
    mutationFn: (id: number) => apiClient.delete(id),
  });

export default useDeleteProduct;
