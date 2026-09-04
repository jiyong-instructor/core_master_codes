import { SetContextLink } from "@apollo/client/link/context";
import { useAuthStore } from "../auth-store";
import { createHttpLink } from "@apollo/client";

export const authLink = new SetContextLink((previousContext) => {
  const accessToken = useAuthStore.getState().accessToken;

  return {
    headers: {
      ...previousContext.headers,
      // access token이 있을 때만 Authorization 헤더를 붙어요.
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBIC_GRAPHQL_API,
  credentials: "include", // 다른 주소의 API와 cookie를 주고받기 위해 include를 추가해줍니다.
});
