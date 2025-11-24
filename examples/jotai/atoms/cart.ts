import { atom } from 'jotai';
import { Cart, Product } from '@repo/shared';

export const cartItems = atom<Cart>([]);

export const totalQuantity = atom((get) => {
  const items = get(cartItems);
  return items.reduce((total, item) => total + item.quantity, 0);
});

export const totalPrice = atom((get) => {
  const items = get(cartItems);
  return items.reduce(
    (total, item) => item.product.price * item.quantity + total,
    0
  );
});

export const addToCart = atom(
  null,
  (get, set, product: Product, quantity: number = 1) => {
    const items = get(cartItems);
    const exists = items.some((item) => item.product.id === product.id);
    if (exists) {
      set(
        cartItems,
        items.map((item) =>
          item.product.id === product.id
            ? {
                product: item.product,
                quantity: item.quantity + quantity,
              }
            : item
        )
      );
      return;
    }
    set(cartItems, [...items, { product, quantity }]);
  }
);

export const deleteCart = atom(null, (get, set, productId: number) => {
  const items = get(cartItems);
  set(
    cartItems,
    items.filter((item) => item.product.id !== productId)
  );
});

export const updateQuantity = atom(
  null,
  (get, set, productId: number, quantity: number) => {
    const items = get(cartItems);
    set(
      cartItems,
      items.map((item) =>
        item.product.id === productId
          ? {
              product: item.product,
              quantity,
            }
          : item
      )
    );
  }
);
