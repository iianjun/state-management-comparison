# State Management Comparison

[한국어](README.ko.md)

A monorepo project to compare and learn various state management libraries.

This project implements a simple E-Commerce website with shopping cart functionality using different state management libraries for comparison.

## Overview

This project allows you to experience and compare the characteristics and pros/cons of various state management libraries by implementing the same functionality (shopping cart) with different libraries.

## Tech Stack

- **Build Tool**: [Turborepo](https://turborepo.org/)
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS 4
- **TypeScript**: TypeScript 5.9

## Project Structure

```
state-management-comparison/
├── examples/              # State management library examples
│   ├── jotai/            # Jotai example
│   ├── mobx/             # MobX example
│   ├── recoil/           # Recoil example
│   ├── redux/            # Redux Toolkit example
│   ├── valtio/           # Valtio example
│   ├── zustand/          # Zustand example
│   └── server/           # API server
├── packages/             # Shared packages
│   ├── shared/           # Common components and utilities
│   ├── eslint-config/    # ESLint configuration
│   └── typescript-config/ # TypeScript configuration
└── templates/            # Project templates
```

### Example Structure

Each state management library example has the following structure:

```
example/
├── app/              # Next.js App Router pages
├── components/       # Components
├── stores/           # State management stores (zustand, mobx, redux, valtio)
├── atoms/            # Atom definitions (jotai, recoil)
└── providers/        # Provider components
```

## Getting Started

### Prerequisites

- Node.js 20.9 or higher
- pnpm 10.13.1 or higher

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd state-management-comparison
```

2. Install dependencies:

```bash
pnpm install
```

### Running Development Server

You can run the development server for each state management library:

```bash
# Run Jotai example
pnpm dev:jotai

# Run Recoil example
pnpm dev:recoil

# Run Zustand example
pnpm dev:zustand

# Run MobX example
pnpm dev:mobx

# Run Redux example
pnpm dev:redux

# Run Valtio example
pnpm dev:valtio
```

Each command runs both the example app and the API server.

- Example app: `http://localhost:3000`
- API server: `http://localhost:4000`

### Build All Apps

```bash
pnpm build
```

### Code Formatting

```bash
pnpm format
```

### Type Checking

```bash
pnpm check-types
```

## State Management Libraries

| Library | Next.js | React | Features | Learning Curve |
|---------|---------|-------|----------|----------------|
| **[Zustand](examples/zustand/README.md)** | 16.0.7 | 19.2.1 | Simple and lightweight API, Flux principles | ⭐ Easy |
| **[Jotai](examples/jotai/README.md)** | 16.0.7 | 19.2.1 | Atomic state management, Bottom-up approach | ⭐ Easy |
| **[Recoil](examples/recoil/README.md)** | 14.2.33 | 18.2.0 | Atomic state management, Developed by Facebook | ⭐⭐ Medium |
| **[Valtio](examples/valtio/README.md)** | 16.0.7 | 19.2.1 | Proxy-based, Mutable style | ⭐⭐ Medium |
| **[MobX](examples/mobx/README.md)** | 16.0.7 | 19.2.1 | Reactive programming, Observable pattern | ⭐⭐⭐ Hard |
| **[Redux Toolkit](examples/redux/README.md)** | 16.0.7 | 19.2.1 | Official Redux toolset, Powerful DevTools | ⭐⭐⭐ Hard |

> **Note**: Recoil doesn't officially support React 19 yet, so it uses React 18.2.0 and Next.js 14.2.33.

## Common Features

All examples implement the following features:

- Product list display
- Add products to cart
- Adjust product quantity in cart
- Remove products from cart
- Calculate cart total

## Adding New Examples

To add a new state management library example:

1. Run the Turborepo generator:

```bash
pnpm turbo gen
```

2. Follow the prompts to enter:
   - Name of the state management library (e.g., `nanostores`, `xstate`, etc.)
   - A basic Next.js template will be generated automatically

3. Navigate to the generated example directory and install the required state management library:

```bash
cd examples/[library-name]
pnpm add [state-management-library]
```

4. Add a development script to the root [package.json](package.json):

```json
{
  "scripts": {
    "dev:[library-name]": "turbo run dev --filter=server --filter=[library-name]"
  }
}
```

5. Implement state management logic:
   - Define state in `stores/` or `atoms/` directory
   - Create UI components in `components/`
   - Add providers in `providers/` if needed

## Useful Scripts

```bash
# Run development server for a specific package
pnpm --filter=jotai dev

# Build a specific package
pnpm --filter=zustand build

# Run lint
pnpm lint
```

## License

MIT
