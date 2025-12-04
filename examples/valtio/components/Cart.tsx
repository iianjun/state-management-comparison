"use client";

import { cartStore } from "@/stores/cart";
import { CartBadge, ShoppingCartIcon } from "@repo/shared";
import Link from "next/link";
import { useSnapshot } from "valtio";

export default function Cart() {
  const { items } = useSnapshot(cartStore);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingCartIcon className="h-6 w-6" />
      {totalQuantity !== 0 && <CartBadge num={totalQuantity} />}
    </Link>
  );
}
