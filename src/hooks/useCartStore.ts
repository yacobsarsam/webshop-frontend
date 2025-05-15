import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getCartItemQuantity: (id: number) => number;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id,
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem,
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }),
  updateCartItem: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  getCartItemQuantity: (id) => {
    const item = get().cartItems.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  },
}));

export default useCartStore;
