import useCategories from "@/hooks/useCategories.tsx";
import {Heading, Spinner, Button, List, ListItem} from "@chakra-ui/react";

const CategoryList = () => {
  const { data, error, isLoading } = useCategories();
  console.log("category data: " + data);
    console.log("error: " +error);

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Category
      </Heading>
      <List.Root>
          {data?.map((category) =>
          <ListItem key={category.id} paddingY='5px'>
              <Button whiteSpace='normal' textAlign="left"  fontSize='xl' variant={"ghost"}>{category.name}</Button>
          </ListItem>)}
      </List.Root>
    </>
  );
};
export default CategoryList;
