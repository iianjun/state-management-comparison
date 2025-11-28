"use client";

import { useCartStore } from "@/providers/cart-store-provider";
import { CartBadge, ShoppingCartIcon } from "@repo/shared";
import Link from "next/link";

export default function Cart() {
  const quantity = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingCartIcon className="h-6 w-6" />
      {quantity !== 0 && <CartBadge num={quantity} />}
    </Link>
  );
}
