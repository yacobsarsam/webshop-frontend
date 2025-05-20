import {Heading} from "@chakra-ui/react";
import useCategory from "@/hooks/useCategory.ts";
import store from "@/store.ts";

const GameHeading = () => {
    const categoryId = store(s=>s.shopQuery.categoryId);
    const category = useCategory(categoryId);

    const heading = category?.category?.name ? `${category.category.name} Category` : "All Categories";
    return (
        <Heading as='h1' marginY={5} fontSize='5xl' > {heading} </ Heading>
    );
}
export default GameHeading;