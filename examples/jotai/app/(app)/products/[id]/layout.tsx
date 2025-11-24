import Cart from "@/components/Cart";
import {
  ArrowLeftIcon,
  getProduct,
  getQueryClient,
  Header,
  Hydrate,
} from "@repo/shared";
import Link from "next/link";

export default async function Layout({
  children,
  params,
}: LayoutProps<"/products/[id]">) {
  const { id } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
  });
  return (
    <Hydrate client={queryClient}>
      <Header>
        <Link aria-label="Back" href="/">
          <ArrowLeftIcon />
        </Link>
        <Cart />
      </Header>
      {children}
    </Hydrate>
  );
}
