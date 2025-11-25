import { Cart } from "@repo/shared";
import { atom, selector } from "recoil";

export const cartState = atom<Cart>({
  key: "cartState",
  default: [],
});

export const totalQuantityState = selector({
  key: "totalQuantityState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const totalPriceState = selector({
  key: "totalPriceState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
});
