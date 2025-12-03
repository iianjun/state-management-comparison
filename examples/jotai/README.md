# Jotai E-Commerce Example

[한국어](README.ko.md)

A simple e-commerce state management example using Jotai.

> This project is part of a series comparing various state management libraries (Redux, MobX, Zustand, etc.).

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Jotai 2.15
- TanStack Query
- TypeScript
- Tailwind CSS

## Impressions of Using Jotai

### 1. Simplicity

Jotai is very simple. Unlike Redux's action, reducer, dispatch pattern, you just define state with `atom()` and you're done.

```typescript
// That's all you need
export const cartItems = atom<Cart>([]);
```

With almost no boilerplate, it's perfect for quickly applying to small projects.

### 2. Separation of Getters and Setters

This is my favorite feature of Jotai. You can clearly separate read-only atoms from write-only atoms:

```typescript
// Read-only (Getter) - computed value
export const totalQuantity = atom((get) => {
  const items = get(cartItems);
  return items.reduce((total, item) => total + item.quantity, 0);
});

// Write-only (Setter) - state update logic
export const addToCart = atom(null, (get, set, product: Product) => {
  const items = get(cartItems);
  // ... logic
  set(cartItems, [...items, { product, quantity: 1 }]);
});
```

You can also separate them in components as needed:

```typescript
const quantity = useAtomValue(totalQuantity); // read-only
const addCart = useSetAtom(addToCart); // write-only
```

This prevents unnecessary re-renders and makes the code's intent clear.

### 3. SSR Support

Integration with Next.js App Router is seamless. Using `useHydrateAtoms` from `jotai/utils`, you can initialize atoms with server-prefetched data:

```typescript
"use client";
import { useHydrateAtoms } from "jotai/utils";

export default function HydrateCartAtom({ children }) {
  const { data: cart } = useCarts();
  useHydrateAtoms([[cartItems, cart]]);
  return children;
}
```

It works without any Provider setup, and you only need to add a Provider when necessary.

### 4. Small Bundle Size

The core package is very lightweight (~5KB gzipped).

### 5. TypeScript Friendly

Type inference works well, automatically handling most cases without explicit type definitions.

## Project Structure

```
atoms/
└── cart.ts          # All cart-related atom definitions

components/
├── Cart.tsx         # Cart icon (displays total quantity)
└── HydrateCartAtom.tsx  # SSR hydration handling

app/
├── layout.tsx       # Root layout
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

Jotai's atomic approach enabled immediate use with almost no boilerplate.
SSR hydration support was easy to implement without any difficulties.

Another great feature is derived atoms, which allow you to create computed values from existing atoms to optimize re-renders, and the approach is very intuitive.

Although I didn't use them, Jotai supports various extensions (jotai-tanstack-query, jotai-immer, etc.).
