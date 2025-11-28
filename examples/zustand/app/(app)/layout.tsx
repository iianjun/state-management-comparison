import { CartStoreProvider } from "@/providers/cart-store-provider";
import { getCarts, getQueryClient } from "@repo/shared";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });
  return <CartStoreProvider>{children}</CartStoreProvider>;
}
