import { Cart, Product } from "@repo/shared";
import { proxy } from "valtio";

interface CartState {
  items: Cart;
}
export const cartStore = proxy<CartState>({
  items: [],
});

// Actions is using cartStore directly
export const addToCart = (product: Product, quantity: number) => {
  const existingItem = cartStore.items.find(
    (item) => item.product.id === product.id
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartStore.items.push({ product, quantity });
  }
};

export const removeFromCart = (productId: number) => {
  const removeIndex = cartStore.items.findIndex(
    (item) => item.product.id === productId
  );
  if (removeIndex === -1) return;
  cartStore.items.splice(removeIndex, 1);
};

export const updateQuantity = (productId: number, quantity: number) => {
  const existingItem = cartStore.items.find(
    (item) => item.product.id === productId
  );
  if (!existingItem) return;
  existingItem.quantity = quantity;
};
