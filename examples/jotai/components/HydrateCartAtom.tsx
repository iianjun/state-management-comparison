"use client";
import { cartItems } from "@/atoms/cart";
import { useCarts } from "@repo/shared";
import { useHydrateAtoms } from "jotai/utils";

export default function HydrateCartAtom({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: cart } = useCarts();
  useHydrateAtoms([[cartItems, cart]]);
  return children;
}
