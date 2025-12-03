"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { CartBadge, ShoppingCartIcon } from "@repo/shared";
import { observer } from "mobx-react-lite";
import Link from "next/link";

export default observer(function Cart() {
  const cartStore = useCartStore();
  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingCartIcon className="h-6 w-6" />
      {cartStore.totalQuantity !== 0 && (
        <CartBadge num={cartStore.totalQuantity} />
      )}
    </Link>
  );
});
