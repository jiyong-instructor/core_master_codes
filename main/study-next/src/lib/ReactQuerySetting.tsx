"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ReactQuerySetting({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState의 함수형 초깃값을 사용하면 QueryClient를 한 번만 만들어요.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // API 오류가 났을 때 오래 기다리지 않도록 재시도하지 않아요.
            retry: false,
          },
        },
      }),
  );

  // 이 Provider 아래에서 React Query hook을 사용할 수 있어요.
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
