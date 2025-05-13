import useCategories from "@/hooks/useCategories.ts";

const useCategory = (id?: number) => {
  const { data: categories, isLoading, error } = useCategories();
  const category = categories?.content.find((category) => category.id === id);

  return { category, isLoading, error };
};

export default useCategory;