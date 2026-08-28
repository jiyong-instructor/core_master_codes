"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { ReactNode } from "react";

const client = new ApolloClient({
  uri: "GRAPHQL_EXAMPLE_API_URL",
  // InMemoryCache는 받아온 GraphQL 결과를 메모리에 보관해요.
  cache: new InMemoryCache(),
});

export default function ApolloSetting({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
