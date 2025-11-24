import HydrateCartAtom from "@/components/HydrateCartAtom";
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
  return (
    <HydrateCartAtom>
      <Hydrate client={queryClient}>{children}</Hydrate>
    </HydrateCartAtom>
  );
}
