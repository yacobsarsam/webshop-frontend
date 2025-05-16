import {
  Button,
  CloseButton,
  Drawer,
  HStack,
  Portal,
  Text,
  Image,
} from "@chakra-ui/react";
import useCartStore from "@/hooks/useCartStore.ts";
import { LuShoppingCart } from "react-icons/lu";
import noImage from "../assets/no-image-placeholder.webp";

const Cart = () => {
  const { cartItems, updateCartItem, removeFromCart } = useCartStore();

  const totalNumArticles = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <Drawer.Root size="lg">
      <Drawer.Trigger asChild>
        <Button variant="outline" size="md" bg="green.600" color="white">
          <LuShoppingCart style={{ marginRight: "8px" }} color="white" />
          Cart ({totalNumArticles}) - ${totalAmount.toFixed(2)}
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Context>
              {() => (
                <Drawer.Body pt="6" py="14" spaceY="3">
                  <div>
                    {cartItems.length === 0 ? (
                      <Text>Your cart is empty.</Text>
                    ) : (
                      cartItems.map((item) => (
                        <HStack
                          key={item.id}
                          justify="space-between"
                          align="center"
                          p={3}
                          borderWidth="1px"
                          borderRadius="md"
                          mb={3}
                          boxShadow="sm"
                        >
                          <Image
                            src={item.picturePath || noImage}
                            boxSize="50px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                          <Text width="150px" lineClamp="1" fontWeight="bold">
                            {item.name}
                          </Text>
                          <HStack>
                            <Button
                              size="sm"
                              onClick={() =>
                                updateCartItem(item.id, item.quantity - 1)
                              }
                              colorPalette="red"
                            >
                              -
                            </Button>
                            <Text fontSize="lg" fontWeight="semibold">
                              {item.quantity}
                            </Text>
                            <Button
                              size="sm"
                              onClick={() =>
                                updateCartItem(item.id, item.quantity + 1)
                              }
                              colorPalette="green"
                            >
                              +
                            </Button>
                          </HStack>
                          <Text fontWeight="semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                          <Button
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            colorPalette="gray"
                          >
                            Remove
                          </Button>
                        </HStack>
                      ))
                    )}
                    <Text mt={4} fontSize="xl" fontWeight="bold">
                      Total: ${totalAmount.toFixed(2)}
                    </Text>
                  </div>
                </Drawer.Body>
              )}
            </Drawer.Context>{" "}
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
