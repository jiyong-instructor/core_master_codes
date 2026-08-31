"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";
import type { ReactNode } from "react";
import { getAccessToken } from "./auth-store";

// 브라우저에서 외부 API를 바로 호출해 CORS 오류가 난다면
// Next.js의 /api/graphql Route Handler를 프록시로 사용할 수 있어요.
const httpLink = new HttpLink({ uri: "/api/graphql" });

// GraphQL 요청을 보내기 직전에 실행되는 인증 링크입니다.
const authLink = new SetContextLink((previousContext) => {
  // 로그인한 뒤 저장해 둔 access token을 꺼냅니다.
  const accessToken = getAccessToken();

  return {
    headers: {
      // 기존에 있던 header도 사라지지 않게 복사합니다.
      ...previousContext.headers,
      // Bearer 뒤에는 반드시 공백 한 칸을 넣습니다.
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

// Apollo Client는 한 번만 만들고 Provider에 전달합니다.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

type ApolloSettingProps = {
  children: ReactNode;
};

export default function ApolloSetting({ children }: ApolloSettingProps) {
  // Provider 안쪽의 모든 클라이언트 컴포넌트에서 Apollo hook을 쓸 수 있어요.
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
