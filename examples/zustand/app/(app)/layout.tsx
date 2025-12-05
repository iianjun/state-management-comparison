import { CartStoreProvider } from "@/providers/cart-store-provider";
import { getCarts, getQueryClient } from "@repo/shared";
import { connection } from "next/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });
  return <CartStoreProvider>{children}</CartStoreProvider>;
}
