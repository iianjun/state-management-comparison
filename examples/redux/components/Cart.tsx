"use client";

import { useAppSelector } from "@/stores/hooks";
import { CartBadge, ShoppingCartIcon } from "@repo/shared";
import Link from "next/link";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart);
  const totalQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingCartIcon className="h-6 w-6" />
      {totalQuantity !== 0 && <CartBadge num={totalQuantity} />}
    </Link>
  );
}
