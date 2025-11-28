import { Cart, Product } from "@repo/shared";
import { create } from "zustand";
import { createSelectors } from "./selector";

interface CartState {
  items: Cart;
}

interface CartAction {
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

type CartStore = CartState & CartAction;

const useCartBase = create<CartStore>((set) => ({
  items: [],
  addToCart: (product, quantity) => {
    set((state) => {
      const items = state.items;
      const exists = items.some((item) => item.product.id === product.id);
      if (exists) {
        return {
          items: items.map((item) =>
            item.product.id === product.id ? { ...item, quantity } : item
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

export const useCartStore = createSelectors(useCartBase);
