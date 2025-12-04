"use client";

import { PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/stores";
import { useCarts } from "@repo/shared";
import { initializeCart } from "@/stores/slices/cartSlice";

export default function RootProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore>(null);
  const { data: cart } = useCarts();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeCart(cart ?? []));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
