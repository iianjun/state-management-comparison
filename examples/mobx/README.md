# MobX E-Commerce Example

MobX를 사용한 간단한 쇼핑몰 상태 관리 예제입니다.

> 이 프로젝트는 다양한 상태 관리 라이브러리(Redux, Jotai, Zustand 등)를 비교하기 위한 시리즈 중 하나입니다.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- MobX 6.13
- MobX React Lite
- TanStack Query
- TypeScript
- Tailwind CSS

## MobX를 사용하면서 느낀 점

### 1. 보일러플레이트가 많다

MobX는 세팅해야 할 것들이 꽤 많다.

```typescript
export class Cart {
  items: CartType = [];

  constructor(cart?: CartType) {
    // 모든 observable, computed, action을 명시적으로 선언해야 함
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

또한 React에서 사용하려면 `mobx` 패키지만으로는 부족하고, `mobx-react-lite` 또는 `mobx-react`를 별도로 설치해야 한다. 이 점이 조금 불편했다.

### 2. SSR 지원이 없어 Context API 사용 필요

Jotai나 Recoil처럼 SSR을 위한 내장 컴포넌트나 Hook이 없다. Zustand처럼 Context API를 직접 구현해야 한다:

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

### 3. 클래스 기반 아키텍처

MobX는 클래스 기반 OOP 스타일을 권장한다:

```typescript
// MobX - 클래스 기반
export class Cart {
  items: CartType = [];

  constructor(cart?: CartType) {
    makeObservable(this, { /* ... */ });
  }

  addToCart(product: Product, quantity: number) { /* ... */ }
}

// 사용
const cartStore = new Cart(initialData);
```

**장점:**
- OOP에 익숙하다면 직관적
- 관련된 state와 action을 하나의 클래스로 캡슐화
- TypeScript의 접근 제어자(private, protected) 활용 가능

**단점:**
- 최근 React의 함수형 트렌드와는 다소 거리가 있음
- Zustand, Jotai, Recoil은 모두 함수형 스타일인 반면 MobX만 클래스 기반
- `new Cart()` 처럼 인스턴스를 직접 생성해야 함

### 4. 명확한 구조: State, Action, Derivations

MobX는 크게 세 가지 개념으로 구성된다:

- **State** (observable): Zustand의 state와 비슷
- **Action**: Zustand의 setter와 비슷
- **Derivations** (computed): Derived atoms처럼 현재 state를 사용해 계산된 값을 가져옴

```typescript
export class Cart {
  items: CartType = []; // State (observable)

  // Derivations (computed) - getter로 선언적으로 정의 가능
  get totalQuantity() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  // Action - mutable 방식으로 상태 변경
  addToCart(product: Product, quantity: number) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity; // 직접 수정
    } else {
      this.items.push({ product, quantity }); // 직접 추가
    }
  }
}
```

Zustand는 derived state를 선언적으로 정의할 수 없었지만, MobX는 `get totalQuantity`처럼 getter로 명시적으로 정의할 수 있어 편리하다.

### 5. Mutable State 권장

MobX는 Proxy를 사용하기 때문에 **mutable state**를 권장한다:

```typescript
// MobX 스타일 (mutable)
existingItem.quantity = existingItem.quantity + quantity;
this.items.push({ product, quantity });

// Zustand 스타일 (immutable)
set({ items: [...items, { product, quantity }] });
```

명시적이고 직관적인 면이 있다. 하지만 주의할 점이 있다.

### 6. 디버깅과 Proxy

MobX는 내부적으로 Proxy를 사용해 변경을 감지한다. 이로 인해:

**장점:**
- Mutable한 코드 작성이 가능 (`item.quantity++`)
- 자동으로 변경 추적

**단점:**
- 디버깅 시 실제 객체가 Proxy로 감싸져 있어 콘솔에서 보기 불편할 수 있음
- DevTools에서 객체 구조를 파악하기 어려울 때가 있음
- Immutable 패턴에 익숙한 개발자에게는 mutable 방식이 오히려 혼란스러울 수 있음

Zustand는 immutable 업데이트로 명확한 데이터 흐름을 제공하는 반면, MobX는 편리하지만 "어디서 변경됐지?"를 추적하기 어려울 수 있다.

### 7. observer로 감싸야 리렌더링 감지

Zustand처럼 주소값(참조)을 확인해 리렌더링 여부를 판단하지만, MobX에서 mutable하게 변경하면 주소값이 바뀌지 않아 리렌더링이 자동으로 일어나지 않는다.

그래서:

1. Store 생성 시 `makeObservable`로 명시적으로 선언
2. 컴포넌트를 `observer`로 감싸야 변경 감지

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

매번 `observer`로 감싸야 한다는 점이 조금 불편하다. 특히:

- **Action만 호출할 때는 observer가 불필요**: 컴포넌트에서 state를 읽지 않고 action만 호출한다면 observer가 필요 없다.
- **State를 읽을 때는 observer 필수**: 하지만 `cartStore.totalQuantity` 같은 state를 읽는다면 반드시 observer로 감싸야 한다.
- **유지보수 어려움**: 나중에 리팩토링하면서 state 참조를 제거했는데 observer를 삭제하는 걸 깜빡할 수 있다. 반대로 새로 state를 추가했는데 observer를 감싸지 않으면 리렌더링이 안 되는 버그가 발생한다.

```typescript
// observer 필요 없음 - action만 호출
function AddButton() {
  const cartStore = useCartStore();
  return <button onClick={() => cartStore.addToCart(product, 1)}>추가</button>;
}

// observer 필수 - state를 읽음
const Cart = observer(function Cart() {
  const cartStore = useCartStore();
  return <div>{cartStore.totalQuantity}</div>; // state 참조
});
```

이런 규칙을 개발자가 항상 기억하고 있어야 해서 실수하기 쉽다.

### 8. Reaction: Side Effect 처리

MobX에는 `autorun`이라는 함수로 state 변경 시 side effect를 감지하는 **"reaction"** 개념이 있다:

```typescript
import { autorun } from "mobx";

autorun(() => {
  console.log(`Total items: ${cartStore.totalQuantity}`);
  // totalQuantity가 변경될 때마다 자동 실행
});
```

이 프로젝트에서는 사용하지 않았지만, 디버깅이나 로깅에 유용할 것 같다.

## 프로젝트 구조

```
stores/
└── cart.ts          # Cart 클래스 정의 (observable, computed, action)

providers/
└── mobx-store-provider.tsx  # Context API로 SSR 처리

hooks/
└── useCartStore.tsx # Store를 가져오는 커스텀 Hook

components/
└── Cart.tsx         # observer로 감싼 장바구니 컴포넌트

app/
├── layout.tsx       # StoreProvider로 감싸기
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

MobX는 명시적인 구조(state, action, derivations)와 mutable한 상태 관리로 직관적인 면이 있다. 특히 computed getter로 derived state를 선언적으로 정의할 수 있는 점이 좋았다.

하지만 **보일러플레이트가 많고**(`makeObservable`, `observer` 등), 별도의 `mobx-react-lite` 설치가 필요하며, **SSR 지원이 내장되어 있지 않아** Context API를 직접 구현해야 하는 점은 아쉬웠다.

**Mutable state**를 사용하면 매번 `observer`로 컴포넌트를 감싸야 변경 감지가 되는데, 이를 깜빡하면 버그가 발생할 수 있어 주의가 필요하다.

**러닝 커브**도 있는 편이다. `observable`, `action`, `computed`, `makeObservable`, `observer` 등 배워야 할 개념이 많고, 각 상황에 맞는 사용법을 익혀야 한다. Zustand나 Jotai처럼 "그냥 쓰면 된다"는 느낌과는 거리가 있다.

**클래스 기반 OOP 스타일**은 호불호가 갈릴 것 같다. OOP에 익숙하면 좋지만, 최근 React의 함수형 트렌드와는 맞지 않는 느낌이다.

**Proxy 기반 변경 감지**는 편리하지만, 디버깅 시 실제 객체 구조를 파악하기 어렵고, immutable 패턴에 익숙한 개발자에게는 오히려 혼란스러울 수 있다.

종합적으로, MobX는 강력하지만 "쉽고 간단하다"고는 할 수 없었다. 작은 프로젝트에서는 오버엔지니어링일 수 있고, 대규모 프로젝트에서 OOP 스타일이 필요할 때 더 적합할 것 같다.
