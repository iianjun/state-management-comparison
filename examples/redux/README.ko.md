# Redux E-Commerce Example

[English](README.md)

Redux Toolkit을 사용한 간단한 쇼핑몰 상태 관리 예제입니다.

> 이 프로젝트는 다양한 상태 관리 라이브러리(Redux, MobX, Zustand 등)를 비교하기 위한 시리즈 중 하나입니다.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Redux Toolkit 2.11
- React-Redux 9.2
- TanStack Query
- TypeScript
- Tailwind CSS

## Redux Toolkit을 사용하면서 느낀 점

### 1. 과거보다 훨씬 줄어든 보일러플레이트

예전 react-redux를 사용해봤다면 알겠지만, Redux Toolkit을 사용하니 보일러플레이트가 확연히 줄어들었다.

```typescript
// slice에서 모든 것을 정의
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity: number }>) {
      // immer가 내장되어 있어 직접 변경 가능
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

### 2. Immer가 기본 내장

Zustand에서는 immer를 사용하려면 별도로 middleware를 설정해야 하는데, Redux Toolkit은 기본으로 내장되어 있다. 덕분에 불변성 관리를 신경 쓰지 않고 직접 상태를 수정하는 것처럼 코드를 작성할 수 있다.

### 3. 불편한 Action Import와 Dispatch 패턴

개인적으로 가장 아쉬웠던 부분이다. 액션을 사용하려면 매번 import하고 dispatch로 감싸줘야 한다:

```typescript
import { addToCart } from "@/stores/slices/cartSlice";

// 컴포넌트에서
const dispatch = useAppDispatch();
dispatch(addToCart({ product, quantity: 1 }));
```

Zustand는 `useXStore()`로 바로 함수를 꺼내 쓸 수 있고, Jotai는 `useSetAtom()`으로 깔끔하게 사용할 수 있는데, Redux는 한 단계가 더 필요하다. 이 부분이 DX 측면에서 아쉬웠다.

### 4. 강력한 단방향 데이터 흐름

엄격한 패턴이 강제되기 때문에 대규모 팀이나 엄격한 아키텍처가 필요한 경우에는 장점이 될 수 있다. Action → Reducer → State 흐름이 명확해서 디버깅과 상태 추적이 용이하다.

### 5. 강력한 Middleware 생태계

Redux의 가장 큰 강점 중 하나는 middleware다. 복잡한 비동기 로직, 로깅, 에러 처리 등이 필요한 경우 Redux middleware는 매우 강력하다.

### 6. SSR 구현

Redux도 특별한 API를 제공하지 않는다. `makeStore`를 통해 서버와 클라이언트에서 각각 store를 생성하고, 서버에서 가져온 초기 데이터를 클라이언트 store에 주입하는 방식이다:

```typescript
// 서버에서 데이터 fetch 후 클라이언트에서 초기화
const store = makeStore();
store.dispatch(initializeCart(initialCart));
```

Jotai의 `useHydrateAtoms`처럼 편리한 API는 없지만, 구현 자체는 어렵지 않다.

### 7. RTK Query

Redux Toolkit은 RTK Query를 내장하고 있지만, 이미 TanStack Query 같은 더 독립적이고 범용적인 라이브러리가 있기 때문에 굳이 사용할 이유는 없어 보인다. RTK Query를 이미 사용 중이라면 모르겠지만, 새 프로젝트에서 시도할 것 같지는 않다.

## 프로젝트 구조

```
stores/
├── index.ts              # Store 설정 및 타입 정의
├── hooks.ts              # Typed hooks (useAppDispatch, useAppSelector)
└── slices/
    └── cartSlice.ts      # 장바구니 slice (actions + reducer)

providers/
└── RootProvider.tsx      # Redux Provider + SSR 처리

components/
└── Cart.tsx              # 장바구니 아이콘 (총 수량 표시)

app/
├── layout.tsx            # 루트 레이아웃
└── (app)/
    ├── page.tsx          # 상품 목록
    ├── products/[id]/
    │   └── page.tsx      # 상품 상세
    └── cart/
        └── page.tsx      # 장바구니
```

## 실행 방법

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 결론

Redux Toolkit 덕분에 예전보다 훨씬 사용하기 편해졌지만, 여전히 Jotai나 Zustand 같은 최신 라이브러리들만큼 간편하지는 않다.

**Redux를 선택할 만한 경우:**
- 이미 Redux를 사용 중인 레거시 프로젝트
- 엄격한 단방향 패턴이 중요한 대규모 팀
- 강력한 middleware 기능이 필수적인 경우
- Redux에만 익숙한 팀원들이 많은 경우

**다른 라이브러리를 고려해볼 경우:**
- 새 프로젝트를 시작하는 경우
- 간단하고 직관적인 API를 원하는 경우
- 보일러플레이트를 최소화하고 싶은 경우

Redux의 middleware 장점이 단점을 압도하지 않는 한, 개인적으로는 다른 전역 상태 관리 라이브러리를 선택할 것 같다.
