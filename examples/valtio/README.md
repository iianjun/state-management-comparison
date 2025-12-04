# Valtio E-Commerce Example

[한국어](README.ko.md)

A simple e-commerce state management example using Valtio.

> This project is part of a series comparing various state management libraries (Redux, MobX, Zustand, etc.).

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Valtio 2.2
- TanStack Query
- TypeScript
- Tailwind CSS

## Impressions of Using Valtio

### 1. Excellent Developer Experience (DX)

Valtio is a proxy + mutable based state management library that was extremely pleasant to use.

```typescript
// Define store
export const cartStore = proxy<CartState>({
  items: [],
});

// Define actions as simple functions
export const addToCart = (product: Product, quantity: number) => {
  const existingItem = cartStore.items.find((item) => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartStore.items.push({ product, quantity });
  }
};

// Use in component
const Cart = () => {
  const snap = useSnapshot(cartStore); // Get state

  return (
    <div>
      {snap.items.map(item => ...)}
      <button onClick={() => addToCart(product, 1)}>Add</button> {/* Just import and use actions */}
    </div>
  );
};
```

Use `useSnapshot` to get the current state from the proxy store, and actions are just functions declared in the store that you import and use directly. No need to wrap with dispatch like Redux or create selectors.

### 2. Minimal Boilerplate

You only need to understand two concepts: `proxy` and `snapshot`:
- **proxy**: An object that manages state mutably
- **snapshot**: An immutable snapshot of the proxy's current state

That's it. These two concepts are all you need. Compared to MobX, which is also proxy/mutable based, Valtio is much simpler. MobX requires learning decorators, observables, actions, etc., but Valtio is very intuitive.

### 3. Automatic Render Optimization

One of Valtio's biggest advantages is **automatic render optimization**.

```typescript
export const todoStore = proxy({
  todos: [],
  count: 0,
});

const TodoList = () => {
  const snap = useSnapshot(todoStore);

  return (
    <div>
      {snap.todos.map(todo => ...)}
    </div>
  );
};
```

This component only uses `todos`, so it won't re-render when `count` changes. Valtio internally uses [proxy-compare](https://blog.axlight.com/posts/how-valtio-proxy-state-works-react-part/) to track only the state actually used in each component and re-renders only when that state changes.

While Zustand requires using selectors for render optimization, Valtio handles it automatically without any extra work.

### 4. SSR Implementation

SSR setup was also straightforward:

```typescript
// providers/RootProvider.tsx
export const RootProvider = ({ children, initialCart }: RootProviderProps) => {
  // Initialize store with initial data fetched from server
  if (initialCart && cartStore.items.length === 0) {
    cartStore.items = initialCart.items;
  }

  return <>{children}</>;
};
```

You just assign the initial data to the store. However, I'm not entirely sure if this is the officially recommended approach.

### 5. Additional Library Required for Derived State

To use derived state, you need to install the `derive-valtio` library separately. It's not included in the core.

### 6. Different from React's Immutability Principle

Valtio manages state in a mutable way. This is convenient, but it differs from React's immutability principle. If you prioritize React's immutability principles, Valtio might not be the right fit.

## Project Structure

```
stores/
└── cart.ts              # Cart store (state + actions)

providers/
└── RootProvider.tsx     # SSR initialization handling

components/
└── Cart.tsx             # Cart icon (displays total quantity)

app/
├── layout.tsx           # Root layout
└── (app)/
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

Valtio is an extremely user-friendly state management library.

**When to choose Valtio:**
- Want simple and intuitive APIs
- Want to minimize boilerplate
- Want automatic render optimization
- Looking for a simpler alternative to MobX
- Rapid prototyping or small projects

**When to consider other libraries:**
- Want to strictly follow React's immutability principles
- Mutable state management doesn't align with team conventions
- Need heavy use of derived state (requires additional library)

Personally, I was very satisfied with the DX. You get the convenience of proxy-based state management without MobX's complexity, and it's even more convenient than Zustand thanks to automatic render optimization. However, you should consider whether the mutable approach fits your team's coding style.
