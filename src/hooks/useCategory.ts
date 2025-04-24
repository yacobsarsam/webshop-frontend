import useCategories from "@/hooks/useCategories.tsx";

const useCategory = (id?:number) => {
  const {data:categories} = useCategories();
return categories?.find(category => category.id === id);
}

export default useCategory;