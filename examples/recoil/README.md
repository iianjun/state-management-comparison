# Recoil E-Commerce Example

Recoil을 사용한 간단한 쇼핑몰 상태 관리 예제입니다.

> 이 프로젝트는 다양한 상태 관리 라이브러리(Redux, MobX, Zustand 등)를 비교하기 위한 시리즈 중 하나입니다.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Recoil 0.7.7
- TanStack Query
- TypeScript
- Tailwind CSS

## Recoil을 사용하면서 느낀 점

### 1. 버전 호환성 문제

Recoil을 사용하기 위해서는 Next.js를 14 버전으로, React를 18로 다운그레이드해야 했다. 아직 최신 Next.js 16과 React 19를 지원하지 않는 것으로 보인다. 즉, **유지보수가 활발하지 않다**는 뜻이다.

실제로 공식 문서를 보면 아직 **'experimental' 단계**라고 명시되어 있다. 따라서 atomic state management approach가 필요하다면 Jotai가 더 나은 선택일 수 있다.

### 2. 번들 사이즈

gzip 기준 **23.5KB**로 Jotai(~5KB)보다 4배 이상 크기가 크다.

### 3. Selector를 통한 최적화

Jotai와 마찬가지로 `selector`를 사용해 기존 atom을 활용한 계산된 값(derived state)을 만들 수 있다:

```typescript
export const totalQuantityState = selector({
  key: "totalQuantityState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});
```

이를 통해 불필요한 리렌더링을 줄이고 상태 로직을 분리할 수 있다.

### 4. Write-only Atom 부재

Jotai에서는 write-only atom을 만들 수 있지만, Recoil의 `selector`는 `get`이 required다. 따라서 **read-only**와 **read/write** 두 가지만 지원하며, write-only는 지원하지 않는다.

이로 인해 상태 변경 로직만 분리하고 싶을 때 Jotai처럼 깔끔하게 처리하기 어렵다.

### 5. Advanced API

Jotai보다 좀 더 advanced한 API를 제공한다. 예를 들어:

- **Snapshot**: Recoil atom의 전체 상태를 한 번에 읽거나 조작할 수 있다
- **useRecoilCallback**: 컴포넌트 외부에서 atom 값을 읽거나 쓰는 커스텀 콜백을 만들 수 있다
- **useRecoilTransaction**: 여러 atom을 동시에 업데이트하는 트랜잭션을 만들 수 있다

이러한 API들은 복잡한 상태 관리 시나리오에서 유용할 수 있다. (참고: Jotai도 `atomEffect`/`onMount`로 라이프사이클 관리가 가능하다)

### 6. 개발자 경험

Meta 팀에서 만들었고 현재까지도 production에서 많이 사용되고 있기 때문에 **안정성은 검증**되었다고 생각한다. 개발자 도구와의 통합도 잘 되어 있어 디버깅이 용이하다.

## 프로젝트 구조

```
atoms/
└── cart.ts          # 장바구니 관련 모든 atom/selector 정의

components/
├── Cart.tsx                  # 장바구니 아이콘 (총 수량 표시)
├── RecoilWrapper.tsx         # RecoilRoot Provider
└── RecoilHydrateCartAtom.tsx # SSR hydration 처리

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

### 언제 Recoil을 사용하면 좋을까?

- **장기 유지보수가 중요한 프로젝트**: Meta 팀의 지원과 production 검증으로 안정성이 보장된다
- **복잡한 상태 관리가 필요한 경우**: Snapshot, Atom Effects 등 advanced API가 필요한 경우
- **이미 Recoil을 사용 중인 레거시 프로젝트**: 안정적으로 동작하고 있다면 굳이 마이그레이션할 필요는 없다

### 언제 Recoil을 피해야 할까?

- **새로운 프로젝트를 시작하는 경우**: experimental 상태이며 최신 버전(Next.js 16, React 19) 지원이 안 된다
- **빠르게 최신 기술 스택을 적용하는 팀**: Recoil의 버전 호환성 문제가 발목을 잡을 수 있다
- **번들 사이즈가 중요한 경우**: Jotai가 4배 이상 가볍다

### 최종 의견

새로운 프로젝트에 atomic approach가 필요하다면 **Recoil보다 Jotai를 추천**한다. Recoil은 아직 experimental 단계이며 유지보수가 활발하지 않아 새로운 프로젝트에는 적합하지 않다.

다만 Recoil은 Meta 팀의 지원과 production 검증을 통해 **안정성과 장기 유지보수 관점에서는 신뢰할 수 있는** 선택지다. 이미 사용 중이라면 문제없이 계속 사용할 수 있다.
