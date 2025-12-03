# Zustand E-Commerce Example

[한국어](README.ko.md)

A simple e-commerce state management example using Zustand.

> This project is part of a series comparing various state management libraries (Redux, MobX, Jotai, etc.).

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Zustand 5.0
- TanStack Query
- TypeScript
- Tailwind CSS

## Impressions of Using Zustand

### 1. Almost No Boilerplate

This seems to be Zustand's biggest advantage. Create a store with `create` and start using it immediately.

```typescript
// For CSR environment, this is all you need
export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (product, quantity) =>
    set((state) => ({ items: [...state.items, { product, quantity }] })),
  removeFromCart: (productId) =>
    set((state) => ({ items: state.items.filter(item => item.product.id !== productId) })),
}));

// Using in components
const items = useCartStore((state) => state.items);
const addToCart = useCartStore((state) => state.addToCart);
```

While Jotai/Recoil require wrapping each state with atoms and "unwrapping" with dedicated hooks like `useAtomValue`, `useSetAtom`, Zustand lets you directly subscribe to the state or functions you need with a single selector function. Much more convenient with just one `use` hook.

> **Note:** This project uses `createStore` with Context API for Next.js SSR, but if you only need CSR or don't need server data, you can just use `create` as shown above.

### 2. Fine-grained Re-rendering Control via Selectors

Another advantage of Zustand is subscribing to only what you need via selectors.

```typescript
// Re-renders only when items change
const items = useCartStore((state) => state.items);

// No re-render as addToCart function doesn't change
const addToCart = useCartStore((state) => state.addToCart);

// ❌ This causes re-render on every store change
const store = useCartStore();
```

While Jotai auto-subscribes at the atom level, Zustand allows more granular optimization through direct selector control.

### 3. Very Small Bundle Size

Zustand is only ~603B (gzipped). Very lightweight.

### 4. TypeScript Friendly

Type inference works well, automatically handling types without explicit definitions.

```typescript
const items = useCartStore((state) => state.items); // Cart type auto-inferred
const addToCart = useCartStore((state) => state.addToCart); // Function signature auto-inferred
```

### 5. Rich Middleware Ecosystem

Zustand provides useful middleware:

```typescript
import { persist, devtools } from 'zustand/middleware';

export const useCartStore = create(
  devtools(
    persist(
      (set) => ({
        items: [],
        addToCart: (product, quantity) => set(/*...*/),
      }),
      { name: 'cart-storage' } // Auto-save to localStorage
    )
  )
);
```

- `persist`: Auto-save to localStorage/sessionStorage
- `devtools`: Use Redux DevTools
- `immer`: Simplified immutability management

Not used in this project due to SSR, but very useful in CSR environments.

### 6. High Flexibility

Zustand is flexible enough that even Redux fans can follow Redux patterns. High degree of freedom in store composition.

### 7. Limitations with Derived State

In Jotai or Recoil, you can declaratively define and reuse derived state (computed values):

```typescript
// Jotai example
export const totalQuantity = atom((get) => {
  const items = get(cartItems);
  return items.reduce((total, item) => total + item.quantity, 0);
});
```

But Zustand requires calculating in selector functions each time or creating custom hooks:

```typescript
// Direct calculation in components
const quantity = useCartStore((state) =>
  state.items.reduce((total, item) => total + item.quantity, 0)
);
```

This feels less intuitive and clean as computation logic needs to be handled in components or extracted to separate functions.

### 8. SSR Support Complexity

For **SSR + server data hydration**, you need to use Context API. This requires creating a store factory with `createStore` instead of `create`:

```typescript
// Create store factory
export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>((set) => ({
    // ...
  }));
};

// Provider component
export const CartStoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<CartStoreApi | null>(null);
  const { data: cart } = useCarts(); // Server data

  if (storeRef.current === null) {
    storeRef.current = createCartStore({ items: cart }); // hydration
  }

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
};
```

This is slightly more complex than Jotai's `useHydrateAtoms` or Recoil's `RecoilRoot` hydration.

> **Note:** Even with Next.js, if your store doesn't need server data, you can just use `create`. For example, for UI state only (modal open/close, theme, etc.), you can use it without Context API.

## Project Structure

```
stores/
└── cart.ts              # Cart store factory

providers/
└── cart-store-provider.tsx  # Context Provider for SSR

components/
└── Cart.tsx             # Cart icon (displays total quantity)

app/
├── layout.tsx           # Root layout
└── (app)/
    ├── layout.tsx       # Apply CartStoreProvider
    ├── page.tsx         # Product list
    ├── products/[id]/
    │   └── page.tsx     # Product detail
    └── cart/
        └── page.tsx     # Cart
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Conclusion

Zustand is an excellent state management library with almost no boilerplate and being very lightweight. The subscription pattern via selectors is intuitive, and handling everything with a single hook is convenient.

However, the inability to declaratively define derived state means computation logic tends to be scattered across components, and SSR environments require implementing Context API patterns, making it slightly more complex than other libraries.

For projects that value flexibility and simplicity, where declarative derived state definition isn't critical, Zustand seems like a good choice.
