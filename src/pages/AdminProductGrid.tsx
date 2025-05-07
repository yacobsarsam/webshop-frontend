import { SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import ProductCardSkeleton from "@/components/ProductCardSkeleton.tsx";
import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCardContainer from "@/components/ProductCardContainer.tsx";
import ProductCard from "@/components/ProductCard.tsx";
import {useProducts} from "@/hooks/useProducts.ts";

const ProductGrid = () => {

    const skeletons = [1,2,3,4,5,6,7,8,9,10];
    const {data, error,isLoading,fetchNextPage,hasNextPage}= useProducts();
    if (error) return ( <Text> {error.message} </Text> );
    console.log("data: ",data)
    console.log("data.pages: ",data?.pages)

    const fetchedGameCount = data?.pages.reduce((acc,page)=>acc+page.content.length,0) || 0;

    return (
        <InfiniteScroll dataLength={fetchedGameCount} hasMore={!!hasNextPage} next={()=>fetchNextPage()} loader={<Spinner/>}>
            <SimpleGrid columns={{sm:1, md:2 , lg:3 , xl:4}} gap={6} padding={5}>
                {isLoading && skeletons.map(skeleton=>(
                    <ProductCardContainer key={skeleton}>
                        <ProductCardSkeleton />
                    </ProductCardContainer>))}

                {data?.pages.map((page,index)=>
                    <React.Fragment key={index}>

                        {page.content.map((product)=>
                            (<ProductCardContainer key={product.id}>
                                <ProductCard product={product} ></ProductCard>
                            </ProductCardContainer>)
                        )}
                    </React.Fragment>)}
            </SimpleGrid>
        </InfiniteScroll>
    )}
export default ProductGrid;