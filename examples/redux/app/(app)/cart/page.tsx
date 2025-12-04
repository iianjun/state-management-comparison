"use client";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { removeFromCart, updateQuantity } from "@/stores/slices/cartSlice";
import {
  CartCheckoutBottomBar,
  ProductCard,
  QuantitySelector,
} from "@repo/shared";
export default function CartPage() {
  const cart = useAppSelector((state) => state.cart);
  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const dispatch = useAppDispatch();
  return (
    <div className="min-h-screen pb-32">
      <div className="space-y-4 p-4">
        {cart.items.map((item) => (
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
                  dispatch(
                    updateQuantity({
                      productId: item.product.id,
                      quantity,
                    })
                  )
                }
                size="sm"
              />
            </div>
            <ProductCard.Delete
              onDelete={() => dispatch(removeFromCart(item.product.id))}
            />
          </ProductCard>
        ))}
      </div>
      <CartCheckoutBottomBar total={totalPrice} shipping={0} />
    </div>
  );
}
