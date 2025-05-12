import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import Product from "@/entities/Product";

const apiClient = new APIClient<Product>("/products");

interface CreateProductInput {
    product: Product;
    picture?: File;
}

const useCreateProduct = () =>
    useMutation({
        mutationFn: ({ product, picture }: CreateProductInput) => {
            const formData = new FormData();

            // Append product JSON as a Blob
            const productBlob = new Blob([JSON.stringify(product)], {
                type: "application/json",
            });
            formData.append("product", productBlob);

            // Append picture if provided
            if (picture) {
                formData.append("picture", picture);
            }

            return apiClient.postForm(formData);
        },
    });

export default useCreateProduct;
