import useUsers from "@/hooks/useUsers.ts";

const useUser = (id?: number) => {
  console.log("id is: ", id )

  const { data, isLoading, error } = useUsers();
  console.log("data is: ", data )
  console.log("data.content is: ", data?.content )

  const user = id && data?.content.find((u) => u.id === id);

  console.log("user is: ", user )
  return { data: user, isLoading, error };
};

export default useUser;
