# Jotai E-Commerce Example

Jotai를 사용한 간단한 쇼핑몰 상태 관리 예제입니다.

> 이 프로젝트는 다양한 상태 관리 라이브러리(Redux, MobX, Zustand 등)를 비교하기 위한 시리즈 중 하나입니다.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Jotai 2.15
- TanStack Query
- TypeScript
- Tailwind CSS

## Jotai를 사용하면서 느낀 점

### 1. 간편함

Jotai는 매우 간단하다. Redux처럼 action, reducer, dispatch 패턴을 따를 필요 없이, 단순히 `atom()`으로 상태를 정의하면 끝이다.

```typescript
// 이게 전부다
export const cartItems = atom<Cart>([]);
```

보일러플레이트가 거의 없어서 작은 프로젝트부터 바로 적용하기 좋다.

### 2. Getter와 Setter 분리

Jotai의 가장 마음에 들었던 부분이다. 읽기 전용 atom과 쓰기 전용 atom을 명확하게 분리할 수 있다:

```typescript
// Read-only (Getter) - 계산된 값
export const totalQuantity = atom((get) => {
  const items = get(cartItems);
  return items.reduce((total, item) => total + item.quantity, 0);
});

// Write-only (Setter) - 상태 변경 로직
export const addToCart = atom(null, (get, set, product: Product) => {
  const items = get(cartItems);
  // ... 로직
  set(cartItems, [...items, { product, quantity: 1 }]);
});
```

컴포넌트에서도 필요에 따라 분리해서 사용할 수 있다:

```typescript
const quantity = useAtomValue(totalQuantity); // 읽기만
const addCart = useSetAtom(addToCart); // 쓰기만
```

이렇게 하면 불필요한 리렌더링을 방지할 수 있고, 코드의 의도가 명확해진다.

### 3. SSR 지원

Next.js App Router와의 통합이 매끄럽다. `jotai/utils`의 `useHydrateAtoms`를 사용하면 서버에서 prefetch한 데이터로 atom을 초기화할 수 있다:

```typescript
"use client";
import { useHydrateAtoms } from "jotai/utils";

export default function HydrateCartAtom({ children }) {
  const { data: cart } = useCarts();
  useHydrateAtoms([[cartItems, cart]]);
  return children;
}
```

별도의 Provider 설정 없이도 동작하고, 필요할 때만 Provider를 추가하면 된다.

### 4. 작은 번들 사이즈

Core 패키지가 매우 가볍다 (~5KB gzipped).

### 5. TypeScript 친화적

타입 추론이 잘 되어서 별도의 타입 정의 없이도 대부분 자동으로 처리된다.

## 프로젝트 구조

```
atoms/
└── cart.ts          # 장바구니 관련 모든 atom 정의

components/
├── Cart.tsx         # 장바구니 아이콘 (총 수량 표시)
└── HydrateCartAtom.tsx  # SSR hydration 처리

app/
├── layout.tsx       # 루트 레이아웃
└── (app)/
    ├── page.tsx     # 상품 목록
    ├── products/[id]/
    │   └── page.tsx # 상품 상세
    └── cart/
        └── page.tsx # 장바구니
```

## 실행 방법

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 결론

Jotai의 atomic한 approach를 통해 보일러플레이트가 거의 없이 바로 사용이 가능했다.
또한 SSR hydration도 쉽게 지원해 어려움 없이 SSR도 구현할 수 있었다.

또 좋았던 점은 Derived atoms으로 기존 atom을 활용해 계산된 값을 따로 만들어 리렌더링을 최적화할 수 있었고, 방법도 매우 직관적이었다.

사용하진 못했지만 다양한 extension을 지원한다. (jotai-tanstack-query, jotai-immer 등)
