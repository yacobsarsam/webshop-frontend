import {
  Button,
  CloseButton,
  Drawer,
  HStack,
  Portal,
  Text,
} from "@chakra-ui/react";
import useCartStore from "@/hooks/useCartStore.ts";
import { LuShoppingCart } from "react-icons/lu";

const Cart = () => {
  const { cartItems, updateCartItem, removeFromCart } = useCartStore();

  //const [isOpen, setIsOpen] = useState(false);

  // const toggleDrawer = () => {
  // setIsOpen(!isOpen);
  //  };

  const totalNumArticles = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm" bg="green.600" color="white">
          <LuShoppingCart style={{ marginRight: "8px" }} color="white" />
          Cart ({totalNumArticles}) - ${totalAmount.toFixed(2)}
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Context>
              {(store) => (
                <Drawer.Body pt="6" spaceY="3">
                  <p>Drawer is open: {store.open ? "true" : "false"}</p>
                  <div>
                    {cartItems.length === 0 ? (
                      <Text>Your cart is empty.</Text>
                    ) : (
                      cartItems.map((item) => (
                        <HStack key={item.id} justify="space-between">
                          <Text>{item.name}</Text>
                          <HStack>
                            <Button
                              size="sm"
                              onClick={() =>
                                updateCartItem(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <Text>{item.quantity}</Text>
                            <Button
                              size="sm"
                              onClick={() =>
                                updateCartItem(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </HStack>
                          <Button
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </HStack>
                      ))
                    )}
                    <Text mt={4}>Total: ${totalAmount.toFixed(2)}</Text>
                  </div>

                  <button onClick={() => store.setOpen(false)}>Close</button>
                </Drawer.Body>
              )}
            </Drawer.Context>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
export default Cart;
