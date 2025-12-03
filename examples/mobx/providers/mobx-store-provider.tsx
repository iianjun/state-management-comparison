"use client";

import { createContext, useRef } from "react";

import { Cart } from "@/stores/cart";
import { useCarts } from "@repo/shared";

interface StoreContextValue {
  cartStore: Cart;
}

export const StoreContext = createContext<StoreContextValue | null>(null);

export const StoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<StoreContextValue | null>(null);
  const { data: cart } = useCarts();
  if (!storeRef.current) {
    storeRef.current = {
      cartStore: new Cart(cart),
    };
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};
