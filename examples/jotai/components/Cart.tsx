"use client";

import { cartItems } from "@/atoms/cart";
import { CartBadge, ShoppingCartIcon } from "@repo/shared";
import { useAtom } from "jotai";
import Link from "next/link";
import { useMemo } from "react";

export default function Cart() {
  const [carts] = useAtom(cartItems);
  const quantity = useMemo(() => {
    return carts.reduce((acc, cart) => acc + cart.quantity, 0);
  }, [carts]);
  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingCartIcon className="w-6 h-6" />
      {quantity !== 0 && <CartBadge num={quantity} />}
    </Link>
  );
}
