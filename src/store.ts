import {create} from "zustand";

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

const store = create<ShopQueryStore>(set => ({
    shopQuery: {},
    setCategoryId: (categoryId) => set(store=>({shopQuery:{...store, categoryId}})),
    setSortOrder: (sortOrder) => set(store=>({shopQuery:{...store, sortOrder}})),
    setSearchText: (searchText) => set(store=>({shopQuery:{...store, searchText}})),
}));

export default store;