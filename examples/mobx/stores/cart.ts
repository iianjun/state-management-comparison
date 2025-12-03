import { makeObservable, observable, action } from "mobx";
import { Cart as CartType, Product } from "@repo/shared";
class Cart {
  items: CartType = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      addToCart: action,
      removeFromCart: action,
      updateQuantity: action,
    });
  }

  get totalQuantity() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  addToCart(product: Product, quantity: number) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }
  removeFromCart(productId: number) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }
  updateQuantity(productId: number, quantity: number) {
    this.items = this.items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
  }
}

export const cartStore = new Cart();
