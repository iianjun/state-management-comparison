"use client";
import { useCartStore } from "@/hooks/useCartStore";
import {
  CartCheckoutBottomBar,
  ProductCard,
  QuantitySelector,
} from "@repo/shared";
import { observer } from "mobx-react-lite";
export default observer(function CartPage() {
  const cartStore = useCartStore();
  return (
    <div className="min-h-screen pb-32">
      <div className="space-y-4 p-4">
        {cartStore.items.map((item) => (
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
                onChange={(quantity) =>
                  cartStore.updateQuantity(item.product.id, quantity)
                }
                size="sm"
              />
            </div>
            <ProductCard.Delete
              onDelete={() => cartStore.removeFromCart(item.product.id)}
            />
          </ProductCard>
        ))}
      </div>
      <CartCheckoutBottomBar total={cartStore.totalPrice} shipping={0} />
    </div>
  );
});
