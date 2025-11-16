# @repo/shared

공통 컴포넌트, 레이아웃, 타입, 스타일을 포함하는 shared 패키지입니다.

## 구조

```
src/
├── components/  # UI 컴포넌트
├── layouts/     # 레이아웃 컴포넌트
├── types/       # TypeScript 타입 정의
├── lib/         # 유틸리티 함수
└── styles/      # Tailwind CSS 스타일
```

## 사용법

### 컴포넌트
```tsx
import { ProductCard } from '@repo/shared/components/ProductCard'
```

### 타입
```tsx
import type { Product } from '@repo/shared/types'
```

### 스타일
```tsx
// app/layout.tsx
import '@repo/shared/styles/globals.css'
```
