"use client";
import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
};
