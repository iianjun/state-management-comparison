import { getCarts, getQueryClient, Hydrate } from "@repo/shared";

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
  return <Hydrate client={queryClient}>{children}</Hydrate>;
}
