# MobX E-Commerce Example

[한국어](README.ko.md)

A simple e-commerce state management example using MobX.

> This project is part of a series comparing various state management libraries (Redux, Jotai, Zustand, etc.).

## Tech Stack

- Next.js 16 (App Router)
- React 19
- MobX 6.13
- MobX React Lite
- TanStack Query
- TypeScript
- Tailwind CSS

## Impressions of Using MobX

### 1. Lots of Boilerplate

MobX requires quite a bit of setup.

```typescript
export class Cart {
  items: CartType = [];

  constructor(cart?: CartType) {
    // Must explicitly declare all observable, computed, action
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
  // ...
}
```

Also, to use in React, the `mobx` package alone isn't enough - you need to separately install `mobx-react-lite` or `mobx-react`. This was a bit inconvenient.

### 2. No Built-in SSR Support, Context API Required

Unlike Jotai or Recoil's built-in SSR components or hooks, you need to implement Context API yourself, like Zustand:

```typescript
export const StoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<StoreContextValue | null>(null);
  const { data: cart } = useCarts();

  if (!storeRef.current) {
    storeRef.current = {
      cartStore: new Cart(cart),
    };
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};
```

### 3. Class-based Architecture

MobX encourages class-based OOP style:

```typescript
// MobX - class-based
export class Cart {
  items: CartType = [];

  constructor(cart?: CartType) {
    makeObservable(this, { /* ... */ });
  }

  addToCart(product: Product, quantity: number) { /* ... */ }
}

// Usage
const cartStore = new Cart(initialData);
```

**Pros:**
- Intuitive if familiar with OOP
- Encapsulates related state and actions in one class
- Can use TypeScript access modifiers (private, protected)

**Cons:**
- Somewhat distant from React's recent functional trend
- While Zustand, Jotai, Recoil are all functional, only MobX is class-based
- Need to directly create instances like `new Cart()`

### 4. Clear Structure: State, Action, Derivations

MobX consists of three main concepts:

- **State** (observable): Similar to Zustand's state
- **Action**: Similar to Zustand's setters
- **Derivations** (computed): Like derived atoms, gets computed values from current state

```typescript
export class Cart {
  items: CartType = []; // State (observable)

  // Derivations (computed) - can be defined declaratively as getter
  get totalQuantity() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  // Action - mutates state directly
  addToCart(product: Product, quantity: number) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity; // direct mutation
    } else {
      this.items.push({ product, quantity }); // direct addition
    }
  }
}
```

While Zustand couldn't declaratively define derived state, MobX can explicitly define it as a getter like `get totalQuantity`, which is convenient.

### 5. Mutable State Encouraged

Because MobX uses Proxy, it encourages **mutable state**:

```typescript
// MobX style (mutable)
existingItem.quantity = existingItem.quantity + quantity;
this.items.push({ product, quantity });

// Zustand style (immutable)
set({ items: [...items, { product, quantity }] });
```

This is explicit and intuitive. But there are caveats.

### 6. Debugging and Proxy

MobX internally uses Proxy to detect changes. This means:

**Pros:**
- Can write mutable code (`item.quantity++`)
- Automatic change tracking

**Cons:**
- During debugging, actual objects are wrapped in Proxy, making console output hard to read
- Sometimes difficult to understand object structure in DevTools
- For developers used to immutable patterns, mutable approach can be confusing

While Zustand provides clear data flow with immutable updates, MobX is convenient but can make it harder to track "where was this changed?"

### 7. Must Wrap with observer for Re-rendering Detection

Like Zustand, MobX checks reference (address) for re-rendering, but mutable changes don't change the reference, so re-rendering doesn't happen automatically.

Therefore:

1. Explicitly declare with `makeObservable` when creating store
2. Must wrap component with `observer` for change detection

```typescript
import { observer } from "mobx-react-lite";

export default observer(function Cart() {
  const cartStore = useCartStore();
  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingCartIcon className="h-6 w-6" />
      {cartStore.totalQuantity !== 0 && (
        <CartBadge num={cartStore.totalQuantity} />
      )}
    </Link>
  );
});
```

Having to wrap with `observer` every time is a bit inconvenient. Specifically:

- **No observer needed for action-only calls**: If a component only calls actions without reading state, observer isn't needed.
- **Observer required when reading state**: But if reading state like `cartStore.totalQuantity`, must wrap with observer.
- **Maintenance difficulty**: During refactoring, you might remove state references but forget to remove observer. Conversely, adding new state references without observer causes re-rendering bugs.

```typescript
// No observer needed - only calling action
function AddButton() {
  const cartStore = useCartStore();
  return <button onClick={() => cartStore.addToCart(product, 1)}>Add</button>;
}

// Observer required - reading state
const Cart = observer(function Cart() {
  const cartStore = useCartStore();
  return <div>{cartStore.totalQuantity}</div>; // state reference
});
```

Developers must always remember these rules, making mistakes easy.

### 8. Reaction: Side Effect Handling

MobX has a **"reaction"** concept for detecting side effects on state changes with `autorun`:

```typescript
import { autorun } from "mobx";

autorun(() => {
  console.log(`Total items: ${cartStore.totalQuantity}`);
  // Auto-runs whenever totalQuantity changes
});
```

Not used in this project, but seems useful for debugging and logging.

## Project Structure

```
stores/
└── cart.ts          # Cart class definition (observable, computed, action)

providers/
└── mobx-store-provider.tsx  # Context API for SSR

hooks/
└── useCartStore.tsx # Custom hook to get store

components/
└── Cart.tsx         # Cart component wrapped with observer

app/
├── layout.tsx       # Wrap with StoreProvider
└── (app)/
    ├── page.tsx     # Product list
    ├── products/[id]/
    │   └── page.tsx # Product detail
    └── cart/
        └── page.tsx # Cart
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Conclusion

MobX has intuitive aspects with its explicit structure (state, action, derivations) and mutable state management. Defining derived state declaratively with computed getters was particularly nice.

However, **lots of boilerplate** (`makeObservable`, `observer`, etc.), requiring separate `mobx-react-lite` installation, and **no built-in SSR support** requiring manual Context API implementation were disappointing.

With **mutable state**, you must wrap components with `observer` for change detection every time, and forgetting this can cause bugs.

There's also a **learning curve**. Many concepts to learn: `observable`, `action`, `computed`, `makeObservable`, `observer`, etc., and learning appropriate usage for each situation. Not the "just use it" feel of Zustand or Jotai.

**Class-based OOP style** will be divisive. Good if familiar with OOP, but doesn't match React's recent functional trend.

**Proxy-based change detection** is convenient, but makes understanding actual object structure during debugging difficult, and can be confusing for developers used to immutable patterns.

Overall, MobX is powerful but can't be called "easy and simple". For small projects it might be over-engineering, more suitable for large-scale projects needing OOP style.
