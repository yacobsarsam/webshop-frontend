import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import Category from "@/entities/Category.ts";

const APIClient = new ApiClient<Category>("/category");
const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: APIClient.getAll,
  });

export default useCategories;