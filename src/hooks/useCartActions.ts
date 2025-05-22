import useCartStore from "@/hooks/useCartStore";
import Product from "@/entities/Product";

const useCartActions = (product: Product) => {
    const { addToCart, updateCartItem, getCartItemQuantity } = useCartStore();

    const quantityInCart = getCartItemQuantity(product.id);

    const handleIncrease = () => {
        if (quantityInCart < product.quantity) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                picturePath: product.picturePath,
                description: product.description,
                categoryId: product.categoryId,
            });
        }
    };

    const handleDecrease = () => {
        if (quantityInCart > 0) {
            updateCartItem(product.id, quantityInCart - 1);
        }
    };

    return { quantityInCart, handleIncrease, handleDecrease };
};

export default useCartActions;