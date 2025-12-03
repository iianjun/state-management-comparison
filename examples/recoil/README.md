# Recoil E-Commerce Example

[한국어](README.ko.md)

A simple e-commerce state management example using Recoil.

> This project is part of a series comparing various state management libraries (Redux, MobX, Zustand, etc.).

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Recoil 0.7.7
- TanStack Query
- TypeScript
- Tailwind CSS

## Impressions of Using Recoil

### 1. Version Compatibility Issues

To use Recoil, I had to downgrade Next.js to version 14 and React to 18. It doesn't support the latest Next.js 16 and React 19 yet. This means **maintenance isn't active**.

The official documentation still states it's in **'experimental' stage**. If you need an atomic state management approach, Jotai might be a better choice.

### 2. Bundle Size

At **23.5KB** gzipped, it's over 4 times larger than Jotai (~5KB).

### 3. Optimization via Selectors

Like Jotai, you can use `selector` to create derived state using existing atoms:

```typescript
export const totalQuantityState = selector({
  key: "totalQuantityState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});
```

This reduces unnecessary re-renders and separates state logic.

### 4. No Write-only Atoms

While Jotai supports write-only atoms, Recoil's `selector` requires `get`. It only supports **read-only** and **read/write**, not write-only.

This makes it harder to cleanly separate state update logic like in Jotai.

### 5. Advanced APIs

Recoil provides more advanced APIs than Jotai. For example:

- **Snapshot**: Read or manipulate entire Recoil atom state at once
- **useRecoilCallback**: Create custom callbacks to read/write atom values outside components
- **useRecoilTransaction**: Create transactions that update multiple atoms simultaneously

These APIs can be useful in complex state management scenarios. (Note: Jotai also has lifecycle management via `atomEffect`/`onMount`)

### 6. Developer Experience

Created by Meta and still widely used in production, I believe its **stability is proven**. Good integration with developer tools makes debugging easy.

## Project Structure

```
atoms/
└── cart.ts          # All cart-related atom/selector definitions

components/
├── Cart.tsx                  # Cart icon (displays total quantity)
├── RecoilWrapper.tsx         # RecoilRoot Provider
└── RecoilHydrateCartAtom.tsx # SSR hydration handling

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

### When to Use Recoil?

- **Projects requiring long-term maintenance**: Stability guaranteed through Meta's support and production validation
- **Complex state management needs**: When advanced APIs like Snapshot, Atom Effects are needed
- **Legacy projects already using Recoil**: If it works stably, no need to migrate

### When to Avoid Recoil?

- **Starting new projects**: Still experimental and doesn't support latest versions (Next.js 16, React 19)
- **Teams rapidly adopting latest tech stack**: Recoil's version compatibility issues could be a bottleneck
- **When bundle size matters**: Jotai is over 4 times lighter

### Final Opinion

For new projects needing an atomic approach, I **recommend Jotai over Recoil**. Recoil is still experimental and not actively maintained, making it unsuitable for new projects.

However, with Meta's support and production validation, Recoil is a **reliable choice from a stability and long-term maintenance perspective**. If you're already using it, you can continue without issues.
