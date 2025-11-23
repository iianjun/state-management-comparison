"use client";

import { totalQuantity } from "@/atoms/cart";
import { CartBadge, ShoppingCartIcon } from "@repo/shared";
import { useAtomValue } from "jotai";
import Link from "next/link";

export default function Cart() {
  const quantity = useAtomValue(totalQuantity);
  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingCartIcon className="w-6 h-6" />
      {quantity !== 0 && <CartBadge num={quantity} />}
    </Link>
  );
}
