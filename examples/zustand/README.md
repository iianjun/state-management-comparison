# Zustand E-Commerce Example

Zustand를 사용한 간단한 쇼핑몰 상태 관리 예제입니다.

> 이 프로젝트는 다양한 상태 관리 라이브러리(Redux, MobX, Jotai 등)를 비교하기 위한 시리즈 중 하나입니다.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Zustand 5.0
- TanStack Query
- TypeScript
- Tailwind CSS

## Zustand를 사용하면서 느낀 점

### 1. 보일러플레이트가 거의 없음

Zustand의 가장 큰 장점인것 같다. `create`로 store를 만들고 바로 사용하면 끝이다.

```typescript
// CSR 환경이라면 이게 전부다
export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (product, quantity) =>
    set((state) => ({ items: [...state.items, { product, quantity }] })),
  removeFromCart: (productId) =>
    set((state) => ({ items: state.items.filter(item => item.product.id !== productId) })),
}));

// 컴포넌트에서 사용
const items = useCartStore((state) => state.items);
const addToCart = useCartStore((state) => state.addToCart);
```

Jotai/Recoil은 atom으로 각 상태를 Wrap하고 `useAtomValue`, `useSetAtom` 같은 전용 훅으로 "Unwrap"해야 하지만, Zustand는 selector 함수 하나로 필요한 상태나 함수를 직접 구독할 수 있다. 하나의 `use` 훅만 사용하면 되어서 훨씬 간편하다.

> **참고:** 이 프로젝트는 Next.js SSR 환경이라 `createStore`와 Context API를 사용했지만, CSR만 사용하거나 서버 데이터가 필요 없다면 위처럼 `create`만 써도 된다.

### 2. Selector를 통한 정밀한 리렌더링 제어

Zustand의 또 다른 장점은 selector를 통해 필요한 부분만 구독할 수 있다는 점이다.

```typescript
// items가 바뀔 때만 리렌더
const items = useCartStore((state) => state.items);

// addToCart 함수는 변하지 않으므로 리렌더 안 됨
const addToCart = useCartStore((state) => state.addToCart);

// ❌ 이렇게 하면 store의 모든 변경에 리렌더
const store = useCartStore();
```

Jotai는 atom 단위로 자동 구독되지만, Zustand는 selector로 직접 제어할 수 있어서 더 세밀한 최적화가 가능하다.

### 3. 매우 작은 번들 사이즈

Zustand는 ~603B (gzipped) 밖에 안 된다. 매우 가볍다.

### 4. TypeScript 친화적

타입 추론이 잘 되어서 별도의 타입 정의 없이도 자동으로 처리된다.

```typescript
const items = useCartStore((state) => state.items); // Cart 타입 자동 추론
const addToCart = useCartStore((state) => state.addToCart); // 함수 시그니처 자동 추론
```

### 5. 다양한 미들웨어 생태계

Zustand는 유용한 미들웨어들을 제공한다:

```typescript
import { persist, devtools } from 'zustand/middleware';

export const useCartStore = create(
  devtools(
    persist(
      (set) => ({
        items: [],
        addToCart: (product, quantity) => set(/*...*/),
      }),
      { name: 'cart-storage' } // localStorage에 자동 저장
    )
  )
);
```

- `persist`: localStorage/sessionStorage 자동 저장
- `devtools`: Redux DevTools 사용 가능
- `immer`: 불변성 관리 간편화

이 프로젝트에서는 SSR 환경이라 사용하지 않았지만, CSR 환경이라면 매우 유용하다.

### 6. 높은 유연성

Zustand는 유연해서 Redux를 좋아하는 사람도 Redux 패턴을 그대로 따라할 수 있다. 원하는 대로 store를 구성할 수 있는 자유도가 높다.

### 7. Derived State의 아쉬움

Jotai나 Recoil에서는 derived state(계산된 값)를 선언적으로 정의하고 재사용할 수 있다:

```typescript
// Jotai의 경우
export const totalQuantity = atom((get) => {
  const items = get(cartItems);
  return items.reduce((total, item) => total + item.quantity, 0);
});
```

하지만 Zustand는 selector 함수로 매번 계산하거나 커스텀 훅을 따로 만들어야 한다:

```typescript
// 컴포넌트에서 직접 계산
const quantity = useCartStore((state) =>
  state.items.reduce((total, item) => total + item.quantity, 0)
);
```

이런 면에서는 계산 로직을 컴포넌트에서 처리하거나 별도 함수로 빼야 하기 때문에 좀 덜 직관적이고 덜 깔끔한 느낌이 있다.

### 8. SSR 지원의 복잡성

**SSR + 서버 데이터 hydration**이 필요한 경우에는 Context API를 사용해야 한다. 이 경우 `create`가 아니라 `createStore`를 통해 store factory를 만들어야 한다:

```typescript
// Store factory 생성
export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>((set) => ({
    // ...
  }));
};

// Provider 컴포넌트
export const CartStoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<CartStoreApi | null>(null);
  const { data: cart } = useCarts(); // 서버에서 받은 데이터

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

Jotai의 `useHydrateAtoms`나 Recoil의 `RecoilRoot`를 통한 hydration보다 조금 더 복잡하다.

> **참고:** Next.js를 사용하더라도 서버 데이터가 필요 없는 store라면 그냥 `create`만 써도 된다. 예를 들어 UI 상태(모달 열림/닫힘, 테마 등)만 관리한다면 Context API 없이 사용 가능하다.

## 프로젝트 구조

```
stores/
└── cart.ts              # 장바구니 store factory

providers/
└── cart-store-provider.tsx  # SSR을 위한 Context Provider

components/
└── Cart.tsx             # 장바구니 아이콘 (총 수량 표시)

app/
├── layout.tsx           # 루트 레이아웃
└── (app)/
    ├── layout.tsx       # CartStoreProvider 적용
    ├── page.tsx         # 상품 목록
    ├── products/[id]/
    │   └── page.tsx     # 상품 상세
    └── cart/
        └── page.tsx     # 장바구니
```

## 실행 방법

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 결론

Zustand는 보일러플레이트가 거의 없고 매우 가볍다는 점에서 훌륭한 상태 관리 라이브러리다. Selector를 통한 구독 방식이 직관적이고, 하나의 훅으로 모든 것을 처리할 수 있어 사용이 간편하다.

다만 derived state를 선언적으로 정의할 수 없어 계산 로직이 컴포넌트에 분산되는 경향이 있고, SSR 환경에서는 Context API 패턴을 적용해야 해서 다른 라이브러리보다 조금 더 복잡한 설정이 필요하다.

유연성과 단순함을 중시하고, derived state의 선언적 정의가 크게 중요하지 않은 프로젝트라면 Zustand가 좋은 선택이 될 것 같다.
