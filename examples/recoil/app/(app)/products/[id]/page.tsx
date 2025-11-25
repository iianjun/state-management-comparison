"use client";

import { cartState } from "@/atoms/cart";
import {
  CartBottomBar,
  ProductCard,
  QuantitySelector,
  useProduct,
} from "@repo/shared";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: product } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const setCart = useSetRecoilState(cartState);

  const handleAddCart = () => {
    setCart((prev) => {
      if (prev.some((item) => item.product.id === Number(id))) {
        return prev.map((item) =>
          item.product.id === Number(id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };
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
      <CartBottomBar price={product.price * quantity} onCart={handleAddCart} />
    </div>
  );
}
