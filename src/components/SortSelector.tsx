import { Button, Menu, MenuItem, Portal } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useShopQueryStore from "@/store.ts";

export const SortSelector = () => {
  const setOrders = [
    { value: '', lable: "Relevance" },
    { value: "name", lable: "Name" },
    { value: "price", lable: "Price (Low to High)" },
    { value: "-price", lable: "Price (High to Low)" },
  ];
  const sortOrder = useShopQueryStore((s) => s.shopQuery.sortOrder);
  const currentSortOrder = setOrders.find((order) => order.value === sortOrder);

  const setSortOrder = useShopQueryStore((s) => s.setSortOrder);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button>
          Order by: {currentSortOrder?.lable || "Relevance"} <BsChevronDown />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {setOrders.map((order) => (
              <MenuItem
                onClick={() => setSortOrder(order.value)}
                key={order.value}
                value={order.value}
              >
                {order.lable}
              </MenuItem>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
export default SortSelector;
