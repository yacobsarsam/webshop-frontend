import useCategories from "@/hooks/useCategories.tsx";
import {
  Heading,
  Spinner,
  Button,
  List,
  ListItem,
  HStack,
} from "@chakra-ui/react";
import store from "@/store.ts";

const CategoryList = () => {
  const { data, error, isLoading } = useCategories();
const selectedCategoryId= store(state => state.shopQuery.categoryId);
    const setSelectedCategoryId = store(state => state.setCategoryId);
  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Category
      </Heading>
      <List.Root>
        {data?.map((category) => (
          <ListItem key={category.id} paddingY="5px">
            <HStack>
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={
                  category.id === selectedCategoryId ? "bold" : "normal"
                }
                onClick={() => setSelectedCategoryId(category.id)}
                fontSize="xl"
                variant={"ghost"}
              >
                {category.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List.Root>
    </>
  );
};
export default CategoryList;
