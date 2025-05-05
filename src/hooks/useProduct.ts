import {useQuery} from "@tanstack/react-query";
import APIClient from "@/services/api-client";

import Product from "@/entities/Product";

const ApiClient = new APIClient<Product>('/products');

const useProduct = (id:number) => useQuery({
    queryKey:['product',id],
    queryFn:()=>ApiClient.get(id)
    });
export default useProduct;