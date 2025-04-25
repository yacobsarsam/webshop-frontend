import useCategories from "@/hooks/useCategories.ts";

const useCategory = (id?:number) => {
  const {data:categories} = useCategories();
return categories?.content.find(category => category.id === id);
}

export default useCategory;