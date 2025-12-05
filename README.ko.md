# State Management Comparison

[English](README.md)

다양한 상태 관리 라이브러리를 비교하고 학습하기 위한 모노레포 프로젝트입니다.

간단한 E-Commerce 웹사이트를 구현하여 장바구니(Cart) 기능을 여러 상태 관리 라이브러리로 구현하고 비교합니다.

## 프로젝트 개요

이 프로젝트는 동일한 기능(장바구니)을 다양한 상태 관리 라이브러리로 구현하여 각 라이브러리의 특징과 장단점을 직접 경험하고 비교할 수 있도록 구성되었습니다.

## 기술 스택

- **빌드 도구**: [Turborepo](https://turborepo.org/)
- **패키지 매니저**: pnpm
- **스타일링**: Tailwind CSS 4
- **타입스크립트**: TypeScript 5.9

## 프로젝트 구조

```
state-management-comparison/
├── examples/              # 상태 관리 라이브러리별 예제
│   ├── jotai/            # Jotai 예제
│   ├── mobx/             # MobX 예제
│   ├── recoil/           # Recoil 예제
│   ├── redux/            # Redux Toolkit 예제
│   ├── valtio/           # Valtio 예제
│   ├── zustand/          # Zustand 예제
│   └── server/           # API 서버
├── packages/             # 공유 패키지
│   ├── shared/           # 공통 컴포넌트 및 유틸리티
│   ├── eslint-config/    # ESLint 설정
│   └── typescript-config/ # TypeScript 설정
└── templates/            # 프로젝트 템플릿
```

### 각 예제 구조

각 상태 관리 라이브러리 예제는 다음과 같은 구조를 가지고 있습니다:

```
example/
├── app/              # Next.js App Router 페이지
├── components/       # 컴포넌트
├── stores/           # 상태 관리 스토어 (zustand, mobx, redux, valtio)
├── atoms/            # Atom 정의 (jotai, recoil)
└── providers/        # 프로바이더 컴포넌트
```

## 시작하기

### 필수 요구사항

- Node.js 20.9 이상
- pnpm 10.13.1 이상

### 설치

1. 저장소를 클론합니다:

```bash
git clone <repository-url>
cd state-management-comparison
```

2. 의존성을 설치합니다:

```bash
pnpm install
```

### 개발 서버 실행

각 상태 관리 라이브러리별로 개발 서버를 실행할 수 있습니다:

```bash
# Jotai 예제 실행
pnpm dev:jotai

# Recoil 예제 실행
pnpm dev:recoil

# Zustand 예제 실행
pnpm dev:zustand

# MobX 예제 실행
pnpm dev:mobx

# Redux 예제 실행
pnpm dev:redux

# Valtio 예제 실행
pnpm dev:valtio
```

각 명령은 해당 예제 앱과 API 서버를 동시에 실행합니다.

- 예제 앱: `http://localhost:3000`
- API 서버: `http://localhost:4000`

### 모든 앱 빌드

```bash
pnpm build
```

### 코드 포맷팅

```bash
pnpm format
```

### 타입 체크

```bash
pnpm check-types
```

## 비교 중인 상태 관리 라이브러리

| 라이브러리 | Next.js | React | 특징 | 학습 난이도 |
|---------|---------|-------|------|----------|
| **[Zustand](examples/zustand/README.ko.md)** | 16.0.7 | 19.2.1 | 간단하고 가벼운 API, Flux 원칙 기반 | ⭐ 쉬움 |
| **[Jotai](examples/jotai/README.ko.md)** | 16.0.7 | 19.2.1 | Atomic 상태 관리, Bottom-up 접근 | ⭐ 쉬움 |
| **[Recoil](examples/recoil/README.ko.md)** | 14.2.33 | 18.2.0 | Atomic 상태 관리, Facebook 개발 | ⭐⭐ 보통 |
| **[Valtio](examples/valtio/README.ko.md)** | 16.0.7 | 19.2.1 | Proxy 기반, Mutable 스타일 | ⭐⭐ 보통 |
| **[MobX](examples/mobx/README.ko.md)** | 16.0.7 | 19.2.1 | 반응형 프로그래밍, Observable 패턴 | ⭐⭐⭐ 어려움 |
| **[Redux Toolkit](examples/redux/README.ko.md)** | 16.0.7 | 19.2.1 | Redux 공식 도구, 강력한 DevTools | ⭐⭐⭐ 어려움 |

> **참고**: Recoil은 아직 React 19를 공식 지원하지 않아 React 18.2.0과 Next.js 14.2.33을 사용합니다.

## 공통 기능

모든 예제는 다음 기능을 구현합니다:

- 상품 목록 조회
- 장바구니에 상품 추가
- 장바구니 상품 수량 조절
- 장바구니 상품 삭제
- 장바구니 총액 계산

## 새로운 예제 추가하기

새로운 상태 관리 라이브러리 예제를 추가하려면:

1. Turborepo 제너레이터를 실행합니다:

```bash
pnpm turbo gen
```

2. 프롬프트에 따라 다음을 입력합니다:
   - 추가할 상태 관리 라이브러리 이름 (예: `nanostores`, `xstate` 등)
   - 기본 Next.js 템플릿이 자동으로 생성됩니다

3. 생성된 예제 디렉토리로 이동하여 필요한 상태 관리 라이브러리를 설치합니다:

```bash
cd examples/[라이브러리-이름]
pnpm add [상태-관리-라이브러리]
```

4. 루트 [package.json](package.json)의 `scripts`에 개발 스크립트를 추가합니다:

```json
{
  "scripts": {
    "dev:[라이브러리-이름]": "turbo run dev --filter=server --filter=[라이브러리-이름]"
  }
}
```

5. 상태 관리 로직을 구현합니다:
   - `stores/` 또는 `atoms/` 디렉토리에 상태 정의
   - `components/`에 UI 컴포넌트 작성
   - 필요한 경우 `providers/`에 프로바이더 추가

## 유용한 스크립트

```bash
# 특정 패키지의 개발 서버만 실행
pnpm --filter=jotai dev

# 특정 패키지 빌드
pnpm --filter=zustand build

# Lint 실행
pnpm lint
```

## 라이선스

MIT
