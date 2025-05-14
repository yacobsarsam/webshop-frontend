import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import User from "@/entities/User.ts";

const APIClient = new ApiClient<User>("/users");
const useCategories = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: APIClient.getAll,
  });

export default useCategories;