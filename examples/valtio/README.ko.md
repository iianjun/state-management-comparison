# Valtio E-Commerce Example

[English](README.md)

Valtio를 사용한 간단한 쇼핑몰 상태 관리 예제입니다.

> 이 프로젝트는 다양한 상태 관리 라이브러리(Redux, MobX, Zustand 등)를 비교하기 위한 시리즈 중 하나입니다.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Valtio 2.2
- TanStack Query
- TypeScript
- Tailwind CSS

## Valtio를 사용하면서 느낀 점

### 1. 뛰어난 개발자 경험 (DX)

Valtio는 proxy + mutable 기반의 상태 관리 라이브러리로, 사용하기 매우 편했다.

```typescript
// store 정의
export const cartStore = proxy<CartState>({
  items: [],
});

// actions는 간단한 함수로 정의
export const addToCart = (product: Product, quantity: number) => {
  const existingItem = cartStore.items.find((item) => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartStore.items.push({ product, quantity });
  }
};

// 컴포넌트에서 사용
const Cart = () => {
  const snap = useSnapshot(cartStore); // state 가져오기

  return (
    <div>
      {snap.items.map(item => ...)}
      <button onClick={() => addToCart(product, 1)}>Add</button> {/* action은 그냥 import해서 사용 */}
    </div>
  );
};
```

`useSnapshot`으로 현재 proxy store의 state를 가져오고, actions는 store에 선언된 함수를 그냥 import해서 사용하기만 하면 된다. Redux처럼 dispatch로 감싸거나, selector를 만들 필요가 없다.

### 2. 거의 없는 보일러플레이트

알아야 하는 개념은 `proxy`와 `snapshot` 두 가지뿐이다:
- **proxy**: mutable하게 상태를 관리하는 객체
- **snapshot**: proxy의 현재 상태를 immutable하게 읽어오는 스냅샷

이 두 개념만 알면 바로 사용할 수 있다. 같은 proxy/mutable 기반인 MobX와 비교했을 때도 훨씬 간단하다. MobX는 decorator, observable, action 등 학습해야 할 개념이 많지만, Valtio는 매우 직관적이다.

### 3. 자동 렌더링 최적화

Valtio의 가장 큰 장점 중 하나는 **자동으로 렌더링 최적화**가 된다는 점이다.

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

위 컴포넌트는 `todos`만 사용하므로, `count`가 변경되어도 리렌더링되지 않는다. Valtio는 내부적으로 [proxy-compare](https://blog.axlight.com/posts/how-valtio-proxy-state-works-react-part/)를 사용해 컴포넌트에서 실제로 사용한 state만 추적하고, 해당 state가 변경되었을 때만 리렌더링한다.

Zustand에서는 selector를 사용해서 렌더링을 최적화해야 하지만, Valtio는 그런 추가 작업 없이 자동으로 최적화해준다.

### 4. SSR 구현

SSR 환경도 setup하기 편했다:

```typescript
// providers/RootProvider.tsx
export const RootProvider = ({ children, initialCart }: RootProviderProps) => {
  // 서버에서 가져온 초기 데이터로 store 초기화
  if (initialCart && cartStore.items.length === 0) {
    cartStore.items = initialCart.items;
  }

  return <>{children}</>;
};
```

단순히 초기 데이터를 store에 할당하기만 하면 된다. 다만 이 방법이 공식적으로 권장되는 방법인지는 확실하지 않다.

### 5. Derived State를 위한 추가 라이브러리 필요

파생 상태(derived state)를 사용하려면 `derive-valtio` 라이브러리를 별도로 설치해야 한다. 기본 기능에는 포함되어 있지 않다.

### 6. React의 불변성 원칙과의 차이

Valtio는 mutable한 방식으로 상태를 관리한다. 이는 편리하지만 React가 지향하는 불변성 원칙과는 다른 접근이다. React의 불변성 원칙을 더 중요하게 생각한다면 Valtio가 맞지 않을 수 있다.

## 프로젝트 구조

```
stores/
└── cart.ts              # Cart store (state + actions)

providers/
└── RootProvider.tsx     # SSR 초기화 처리

components/
└── Cart.tsx             # 장바구니 아이콘 (총 수량 표시)

app/
├── layout.tsx           # 루트 레이아웃
└── (app)/
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

Valtio는 사용하기 매우 편한 상태 관리 라이브러리다.

**Valtio를 선택할 만한 경우:**
- 간단하고 직관적인 API를 원하는 경우
- 보일러플레이트를 최소화하고 싶은 경우
- 자동 렌더링 최적화를 원하는 경우
- MobX의 간단한 대안을 찾는 경우
- 빠른 프로토타이핑이나 작은 프로젝트

**다른 라이브러리를 고려해볼 경우:**
- React의 불변성 원칙을 엄격히 따르고 싶은 경우
- Mutable한 상태 관리가 팀 컨벤션과 맞지 않는 경우
- 파생 상태를 많이 사용해야 하는 경우 (별도 라이브러리 필요)

개인적으로 DX 측면에서 매우 만족스러웠다. MobX의 복잡함 없이 proxy 기반의 편리함을 누릴 수 있고, Zustand보다도 렌더링 최적화가 자동으로 되어 더 편했다. 다만 mutable한 방식이 팀의 코딩 스타일과 맞는지는 고려해봐야 한다.
