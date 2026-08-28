"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { ReactNode } from "react";

const client = new ApolloClient({
  uri: "GRAPHQL_EXAMPLE_API_URL",
  cache: new InMemoryCache(),
});

type ApolloSettingProps = {
  children: ReactNode;
};

export default function ApolloSetting({ children }: ApolloSettingProps) {
  // Apollo Hook을 사용할 화면보다 위에서 Provider로 감싸요.
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
