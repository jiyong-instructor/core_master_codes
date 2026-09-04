"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 컴포넌트가 다시 렌더링되어도 같은 QueryClient를 사용해요.
  const [queryClient] = useState(() => new QueryClient());

  return (
    // Provider 아래에서 React Query hook을 사용할 수 있어요.
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
