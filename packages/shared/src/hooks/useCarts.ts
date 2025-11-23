import { useSuspenseQuery } from "@tanstack/react-query";
import { getCarts } from "../services/cart";

export function useCarts() {
  return useSuspenseQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
    select: (data) => data.data,
  });
}
