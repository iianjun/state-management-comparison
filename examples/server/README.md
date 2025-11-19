# API Server

A simple Express server providing API endpoints for the state management comparison examples.

## Endpoints

### 1. GET /products
Returns all available products.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Premium Running Shoes",
      "price": 129.99,
      "image": "...",
      "category": "Footwear",
      "description": "...",
      "rating": 4.5,
      "reviewCount": 128
    },
    ...
  ],
  "count": 6
}
```

### 2. GET /cart/products
Returns products that are currently in the cart.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Premium Running Shoes",
      ...
    },
    ...
  ],
  "count": 3
}
```

### 3. GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Getting Started

### Install dependencies
```bash
pnpm install
```

### Run in development mode
```bash
pnpm dev
```

The server will start on `http://localhost:3001`

### Build for production
```bash
pnpm build
```

### Run in production mode
```bash
pnpm start
```

## Environment Variables

- `PORT` - Server port (default: 3001)
