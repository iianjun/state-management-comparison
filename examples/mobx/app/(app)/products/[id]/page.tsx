"use client";

import { cartStore } from "@/stores/cart";
import {
  CartBottomBar,
  ProductCard,
  QuantitySelector,
  useProduct,
} from "@repo/shared";
import { use, useState } from "react";

export default function Page({ params }: PageProps<"/products/[id]">) {
  const { id } = use(params);
  const { data: product } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="pb-28">
      <ProductCard product={product}>
        <ProductCard.Image width={448} height={448} className="rounded-none" />
        <div className="space-y-4 p-4">
          <div>
            <ProductCard.Category className="mb-1" />
            <ProductCard.Name className="mb-2" />
            <ProductCard.Rating className="mb-3" />
            <ProductCard.Description />
          </div>
          <div className="flex items-center gap-4">
            <span>Quantity:</span>
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </div>
        </div>
      </ProductCard>
      <CartBottomBar
        price={product.price * quantity}
        onCart={() => cartStore.addToCart(product, quantity)}
      />
    </div>
  );
}
