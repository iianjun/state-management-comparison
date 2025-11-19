"use client";
import { QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "../lib/get-query-client";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = getQueryClient();
  return (
    <TanStackQueryClientProvider client={client}>
      {children}
    </TanStackQueryClientProvider>
  );
}
