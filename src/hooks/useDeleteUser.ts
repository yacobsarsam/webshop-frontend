import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import User from "@/entities/User.ts";

const apiClient = new APIClient<User>("/users");

const useDeleteProduct = () =>
  useMutation({
    mutationFn: (id: number) => apiClient.delete(id),
  });

export default useDeleteProduct;
