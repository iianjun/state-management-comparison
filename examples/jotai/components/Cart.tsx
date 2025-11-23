"use client";

import { CartBadge, ShoppingCartIcon, useCarts } from "@repo/shared";
import Link from "next/link";
import { useMemo } from "react";

export default function Cart() {
  const { data } = useCarts();
  const quantity = useMemo(() => {
    return data.reduce((acc, cart) => acc + cart.quantity, 0);
  }, [data]);
  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingCartIcon className="w-6 h-6" />
      {quantity !== 0 && <CartBadge num={quantity} />}
    </Link>
  );
}
