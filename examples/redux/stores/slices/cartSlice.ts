import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, Product } from "@repo/shared";

export interface CartState {
  items: Cart;
}
const initialState: CartState = { items: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const removeIndex = state.items.findIndex(
        (item) => item.product.id === action.payload
      );
      if (removeIndex === -1) return;
      state.items.splice(removeIndex, 1);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.productId
      );
      if (!existingItem) return;
      existingItem.quantity = action.payload.quantity;
    },
    initializeCart(state, action: PayloadAction<Cart>) {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, initializeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
