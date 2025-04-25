import { useInfiniteQuery } from "@tanstack/react-query";
import useShopQueryStore from "@/store.ts";
import Product from "@/entities/Product.ts";
import ms from "ms";
import ApiClient, {FetchResponse} from "@/services/api-client.tsx";

const APIClient = new ApiClient<Product>("/products");

export const useProducts = () => {
  const shopQuery = useShopQueryStore((s) => s.shopQuery);

  return useInfiniteQuery<FetchResponse<Product>, Error>({
    queryKey: ["products", shopQuery],
    queryFn: ({ pageParam = 1 }) =>
      APIClient.getAll({
        params: {
          category: shopQuery.categoryId,
          ordering: shopQuery.sortOrder,
          search: shopQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 0,
    staleTime: ms("24h"), // 24 hours
  });
};
