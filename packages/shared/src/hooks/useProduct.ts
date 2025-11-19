import { useSuspenseQuery } from "@tanstack/react-query";
import { getProduct } from "../services/product";

export const useProduct = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
    select: (data) => data.data,
  });
};
