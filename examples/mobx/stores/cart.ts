import { makeObservable, observable, action, computed } from "mobx";
import { Cart as CartType, Product } from "@repo/shared";
import { enableStaticRendering } from "mobx-react-lite";

const isServer = typeof window === "undefined";
// 서버쪽에서 렌더링이 발생해 memory leak를 방지
/**
 * If observer is used in server side rendering context; make sure to call enableStaticRendering(true),
 * so that observer won't subscribe to any observables used, and no GC problems are introduced.
 */
enableStaticRendering(isServer);
// mobx recommends "mutable" states
export class Cart {
  items: CartType = [];

  constructor(cart?: CartType) {
    makeObservable(this, {
      items: observable,
      totalQuantity: computed,
      totalPrice: computed,
      addToCart: action,
      removeFromCart: action,
      updateQuantity: action,
    });
    if (cart) {
      this.items = cart;
    }
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
    const removeIndex = this.items.findIndex(
      (item) => item.product.id === productId
    );
    if (removeIndex === -1) return;
    this.items.splice(removeIndex, 1);
  }
  updateQuantity(productId: number, quantity: number) {
    const existingItem = this.items.find(
      (item) => item.product.id === productId
    );
    if (!existingItem) return;
    existingItem.quantity = quantity;
  }
}
