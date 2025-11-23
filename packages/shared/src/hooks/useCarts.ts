import { useSuspenseQuery } from "@tanstack/react-query";
import { getCarts } from "../services/cart";

export const useCarts = () => {
  return useSuspenseQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
    select: (data) => data.data,
  });
};
