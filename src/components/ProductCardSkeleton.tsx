import {Card, CardBody, Skeleton, SkeletonText} from "@chakra-ui/react";

const ProductCardSkeleton = () => {

    return (
    <Card.Root>
        <Skeleton height='250px' />
            <CardBody>
                <SkeletonText/>
            </CardBody>
    </Card.Root>
    )
}
export default ProductCardSkeleton;