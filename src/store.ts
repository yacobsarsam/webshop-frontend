import { create } from "zustand";

interface ShopQuery {
  categoryId?: number;
  sortOrder?: string;
  searchText?: string;
}

interface ShopQueryStore {
  shopQuery: ShopQuery;
  setCategoryId: (categoryId: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
}

const store = create<ShopQueryStore>((set) => ({
  shopQuery: {},
  setCategoryId: (categoryId) =>
    set((store) => ({ shopQuery: { ...store.shopQuery, categoryId } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ shopQuery: { ...store.shopQuery, sortOrder } })),
  setSearchText: (searchText) =>
    set((store) => ({ shopQuery: { ...store.shopQuery, searchText } })),
  /*setProducts: (products) => set(() => ({ products })),
  removeProduct: (productId) =>
      set((store) => ({
        products: store.products.filter((product) => product.id !== productId),
      })),*/
}));

export default store;
