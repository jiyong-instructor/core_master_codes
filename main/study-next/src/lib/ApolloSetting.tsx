"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

// Apollo Client가 요청을 보낼 GraphQL API 주소입니다.
const httpLink = new HttpLink({
  uri: "http://main-example.codebootcamp.co.kr/graphql", // 단 하나의 endpoint 주소
});

// Apollo Client는 GraphQL 요청과 응답 데이터의 캐시를 관리합니다.
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

type ApolloSettingProps = {
  children: React.ReactNode;
};

export default function ApolloSetting({ children }: ApolloSettingProps) {
  // Provider 안쪽의 모든 클라이언트 컴포넌트에서 Apollo Hook(커스텀 함수)를 사용 할 수 있습니다.
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
