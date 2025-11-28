import { Cart, Product } from "@repo/shared";
import { createStore } from "zustand";

interface CartState {
  items: Cart;
}

interface CartAction {
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

export type CartStore = CartState & CartAction;

const defaultInitState: CartState = {
  items: [],
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>((set) => ({
    ...initState,
    addToCart: (product, quantity) => {
      set((state) => {
        const items = state.items;
        const exists = items.some((item) => item.product.id === product.id);
        if (exists) {
          return {
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        } else {
          return {
            items: [...state.items, { product, quantity }],
          };
        }
      });
    },
    removeFromCart: (productId) => {
      set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId),
      }));
    },
    updateQuantity: (productId, quantity) => {
      set((state) => ({
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      }));
    },
  }));
};
