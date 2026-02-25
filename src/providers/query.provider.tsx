"use client";

import { PropsWithChildren, ReactNode, useMemo } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = PropsWithChildren;

export default function QueryProvider({ children }: Props): ReactNode {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
