import { useContext } from "react";
import { StoreContext } from "@/providers/mobx-store-provider";

export const useCartStore = () => {
  const store = useContext(StoreContext);
  if (!store?.cartStore) {
    throw new Error("useCartStore must be used within StoreProvider");
  }
  return store.cartStore;
};
