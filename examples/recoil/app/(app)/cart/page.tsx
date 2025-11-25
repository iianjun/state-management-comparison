"use client";
import { cartState, totalPriceState } from "@/atoms/cart";
import {
  CartCheckoutBottomBar,
  ProductCard,
  QuantitySelector,
} from "@repo/shared";
import { useRecoilState, useRecoilValue } from "recoil";
export default function CartPage() {
  const [cart, setCart] = useRecoilState(cartState);
  const totalPrice = useRecoilValue(totalPriceState);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };
  const handleRemoveItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };
  return (
    <div className="min-h-screen pb-32">
      <div className="space-y-4 p-4">
        {cart.map((item) => (
          <ProductCard
            key={item.product.id}
            product={item.product}
            className="flex gap-4 border-b border-gray-200 pb-4">
            <ProductCard.Image
              className="h-24 w-24 shrink-0"
              width={96}
              height={96}
            />
            <div className="min-w-0 flex-1">
              <ProductCard.Name className="mb-1 text-base" />
              <ProductCard.Price className="mb-2" />
              <QuantitySelector
                className="w-fit"
                value={item.quantity}
                onChange={(quantity) => {
                  handleQuantityChange(item.product.id, quantity);
                }}
                size="sm"
              />
            </div>
            <ProductCard.Delete
              onDelete={() => handleRemoveItem(item.product.id)}
            />
          </ProductCard>
        ))}
      </div>
      <CartCheckoutBottomBar total={totalPrice} shipping={0} />
    </div>
  );
}
