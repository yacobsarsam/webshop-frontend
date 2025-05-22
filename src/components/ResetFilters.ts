import store from "@/store";

let clearSearchInput: (() => void) | null = null;

export const setClearSearchInputCallback = (callback: () => void) => {
  clearSearchInput = callback;
};

const ResetFilters = () => {
  store.setState({ shopQuery: {} });
  if (clearSearchInput) clearSearchInput(); // Clear the search input
};

export default ResetFilters;
