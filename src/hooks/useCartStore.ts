import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  picturePath?: string; // Add this property
    description?: string; // Add this property
    categoryId?: number; // Add this property
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getCartItemQuantity: (id: number) => number;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id,
      );
      const updatedCartItems = existingItem
        ? state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem,
          )
        : [...state.cartItems, item];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),
  updateCartItem: (id, quantity) =>
    set((state) => {
      const updatedCartItems = state.cartItems
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),
  getCartItemQuantity: (id) => {
    const item = get().cartItems.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  },
}));

export default useCartStore;
