"use client";
import { initializeCart } from "@/stores/cart";
import { useCarts } from "@repo/shared";
import { useRef } from "react";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false);
  const { data: cart } = useCarts();
  if (!initialized.current) {
    initialized.current = true;
    initializeCart(cart ?? []);
  }
  return <>{children}</>;
}
