"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type CartStore, createCartStore } from "@/stores/cart";
import { useCarts } from "@repo/shared";

export type CartStoreApi = ReturnType<typeof createCartStore>;

export const CartStoreContext = createContext<CartStoreApi | undefined>(
  undefined
);

export const CartStoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<CartStoreApi | null>(null);
  const { data: cart } = useCarts();
  if (storeRef.current === null) {
    storeRef.current = createCartStore({ items: cart });
  }

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);

  if (!cartStoreContext) {
    throw new Error(`useCartStore must be used within CartStoreProvider`);
  }

  return useStore(cartStoreContext, selector);
};
