import RootProvider from "@/providers/RootProvider";
import { connection } from "next/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  return <RootProvider>{children}</RootProvider>;
}
