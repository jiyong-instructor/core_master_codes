"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";

// Day09 게시판 예제는 기존 강의용 API를 그대로 사용합니다.
const exampleHttpLink = new HttpLink({
  uri: "http://main-example.codebootcamp.co.kr/graphql",
});

// Day10 회원가입과 로그인은 과제용 API로 보냅니다.
// 브라우저가 외부 API를 직접 호출할 때 생기는 CORS 문제를 피하려고
// 같은 Next.js 프로젝트 안의 Route Handler를 한 번 거쳐요.
const practiceHttpLink = new HttpLink({
  uri: "/api/graphql",
  credentials: "include",
});

// 로그인 후 받은 accessToken을 Authorization 헤더에 넣어 줍니다.
const authLink = new SetContextLink((previousContext) => {
  const accessToken =
    typeof window === "undefined"
      ? ""
      : (sessionStorage.getItem("accessToken") ?? "");

  return {
    headers: {
      ...previousContext.headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

// 요청을 실행할 때 context.apiName이 practice이면 과제용 API로 보냅니다.
// 아무 설정이 없으면 기존 강의용 API로 보내므로 Day09 예제가 깨지지 않아요.
const apiLink = ApolloLink.split(
  (operation) => operation.getContext().apiName === "practice",
  practiceHttpLink,
  exampleHttpLink,
);

const client = new ApolloClient({
  link: ApolloLink.from([authLink, apiLink]),
  cache: new InMemoryCache(),
});

type ApolloSettingProps = {
  children: React.ReactNode;
};

export default function ApolloSetting({ children }: ApolloSettingProps) {
  // Provider 안쪽의 모든 클라이언트 컴포넌트에서 Apollo 훅을 사용할 수 있습니다.
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
