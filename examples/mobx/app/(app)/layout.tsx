import { StoreProvider } from "@/providers/mobx-store-provider";
import { connection } from "next/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  return <StoreProvider>{children}</StoreProvider>;
}
