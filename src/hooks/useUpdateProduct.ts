// src/hooks/useUpdateProduct.ts
import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import Product from "@/entities/Product";

const apiClient = new APIClient<Product>("/products");

const useUpdateProduct = () =>
    useMutation({
        mutationFn: (product: Product) => apiClient.put(product.id!, product),
    });

export default useUpdateProduct;
