import { ApiResponse, CartItem } from "../types";

export const getCarts = async () => {
  const response = await fetch("http://localhost:4000/carts");
  if (!response.ok) {
    throw new Error("Failed to fetch carts");
  }
  const data = (await response.json()) as ApiResponse<CartItem[]>;
  return data;
};
