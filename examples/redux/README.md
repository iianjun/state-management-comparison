# Redux E-Commerce Example

[한국어](README.ko.md)

A simple e-commerce state management example using Redux Toolkit.

> This project is part of a series comparing various state management libraries (Redux, MobX, Zustand, etc.).

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Redux Toolkit 2.11
- React-Redux 9.2
- TanStack Query
- TypeScript
- Tailwind CSS

## Impressions of Using Redux Toolkit

### 1. Much Less Boilerplate Than Before

If you've used the old react-redux, you'll notice Redux Toolkit significantly reduces boilerplate.

```typescript
// Define everything in a slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity: number }>) {
      // Immer is built-in, so you can mutate directly
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});
```

### 2. Built-in Immer

Unlike Zustand where you need to set up immer as middleware, Redux Toolkit includes it by default. This lets you write code as if you're directly modifying state without worrying about immutability.

### 3. Inconvenient Action Import and Dispatch Pattern

This was personally my biggest pain point. To use an action, you need to import it and wrap it with dispatch every time:

```typescript
import { addToCart } from "@/stores/slices/cartSlice";

// In component
const dispatch = useAppDispatch();
dispatch(addToCart({ product, quantity: 1 }));
```

With Zustand, you can directly extract functions with `useXStore()`, and Jotai offers clean usage with `useSetAtom()`. Redux requires an extra step, which hurts the DX.

### 4. Strong Unidirectional Data Flow

The enforced strict pattern can be an advantage for large teams or when strict architecture is important. The clear Action → Reducer → State flow makes debugging and state tracking easier.

### 5. Powerful Middleware Ecosystem

One of Redux's biggest strengths is its middleware. For complex async logic, logging, error handling, etc., Redux middleware is very powerful.

### 6. SSR Implementation

Redux doesn't provide special APIs for SSR either. You create stores separately on server and client using `makeStore`, then inject server-fetched initial data into the client store:

```typescript
// Initialize on client after fetching data on server
const store = makeStore();
store.dispatch(initializeCart(initialCart));
```

It doesn't have convenient APIs like Jotai's `useHydrateAtoms`, but the implementation itself isn't difficult.

### 7. RTK Query

Redux Toolkit includes RTK Query, but with more independent and versatile libraries like TanStack Query already available, there's no compelling reason to use it. If you're already using RTK Query, that's one thing, but I wouldn't try it in a new project.

## Project Structure

```
stores/
├── index.ts              # Store configuration and type definitions
├── hooks.ts              # Typed hooks (useAppDispatch, useAppSelector)
└── slices/
    └── cartSlice.ts      # Cart slice (actions + reducer)

providers/
└── RootProvider.tsx      # Redux Provider + SSR handling

components/
└── Cart.tsx              # Cart icon (displays total quantity)

app/
├── layout.tsx            # Root layout
└── (app)/
    ├── page.tsx          # Product list
    ├── products/[id]/
    │   └── page.tsx      # Product detail
    └── cart/
        └── page.tsx      # Cart
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Conclusion

Thanks to Redux Toolkit, it's much easier to use than before, but it's still not as simple as modern libraries like Jotai or Zustand.

**When to choose Redux:**
- Legacy projects already using Redux
- Large teams where strict unidirectional patterns are important
- When powerful middleware features are essential
- Teams with members only familiar with Redux

**When to consider other libraries:**
- Starting a new project
- Want simple and intuitive APIs
- Want to minimize boilerplate

Unless Redux's middleware advantages outweigh its disadvantages, I would personally choose other global state management libraries.
