import useUsers from "@/hooks/useUsers.ts";

const useUser = (id?: number) => {
  const { data, isLoading, error } = useUsers();

  const user = id && data?.content.find((u) => u.id === id);

  return { data: user, isLoading, error };
};
export default useUser;