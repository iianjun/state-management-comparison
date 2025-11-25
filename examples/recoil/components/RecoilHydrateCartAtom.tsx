"use client";
import { cartState } from "@/atoms/cart";
import { Cart, useCarts } from "@repo/shared";
import { RecoilRoot } from "recoil";

export default function RecoilHydrateCartAtom({
  children,
}: React.PropsWithChildren) {
  const { data: cart } = useCarts();
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(cartState, cart);
      }}>
      {children}
    </RecoilRoot>
  );
}
