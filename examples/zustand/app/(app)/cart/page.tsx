"use client";
import {
  CartCheckoutBottomBar,
  ProductCard,
  QuantitySelector,
} from "@repo/shared";
import { useCartStore } from "@/stores/cart";
export default function CartPage() {
  const items = useCartStore.use.items();
  const total = useCartStore((state) =>
    state.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    )
  );

  const updateQuantity = useCartStore.use.updateQuantity();
  const deleteCartItem = useCartStore.use.removeFromCart();
  return (
    <div className="min-h-screen pb-32">
      <div className="space-y-4 p-4">
        {items.map((item) => (
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
                  updateQuantity(item.product.id, quantity)
                }
                size="sm"
              />
            </div>
            <ProductCard.Delete
              onDelete={() => deleteCartItem(item.product.id)}
            />
          </ProductCard>
        ))}
      </div>
      <CartCheckoutBottomBar total={total} shipping={0} />
    </div>
  );
}
