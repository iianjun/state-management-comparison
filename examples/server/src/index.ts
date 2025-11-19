import express, { Request, Response } from "express";
import cors from "cors";
import { products } from "./data/products.js";
import { cartItems } from "./data/cart.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. GET /products - Get all products
app.get("/products", async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.json({
    success: true,
    data: products,
  });
});

app.get("/products/:id", async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { id } = req.params;
  const product = products.find((product) => product.id === Number(id));
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.json({
    success: true,
    data: product,
  });
});

// 2. GET /cart/products - Get products that are in the cart
app.get("/cart/products", async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const cartProducts = products.filter((product) =>
    cartItems.includes(product.id)
  );

  res.json({
    success: true,
    data: cartProducts,
  });
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📦 Available endpoints:`);
  console.log(`   GET http://localhost:${PORT}/products`);
  console.log(`   GET http://localhost:${PORT}/cart/products`);
  console.log(`   GET http://localhost:${PORT}/health`);
});
