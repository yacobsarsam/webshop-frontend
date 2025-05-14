import { useMutation } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import User from "@/entities/User";

const apiClient = new APIClient<User>("/users");

const useUpdateUser = () =>
  useMutation({
    mutationFn: (user: User) => apiClient.put(user.id!, user),
  });

export default useUpdateUser;