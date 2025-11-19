import { ApiResponse, Product } from "../types";

export const getProducts = async () => {
  const response = await fetch("http://localhost:4000/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = (await response.json()) as ApiResponse<Product[]>;
  return data;
};

export const getProduct = async (id: string) => {
  const response = await fetch(`http://localhost:4000/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = (await response.json()) as ApiResponse<Product>;
  return data;
};
