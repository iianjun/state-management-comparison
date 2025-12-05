import { connection } from "next/server";
import RootProvider from "@/providers/RootProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  return <RootProvider>{children}</RootProvider>;
}
