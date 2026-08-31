"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const FETCH_USER_LOGGED_IN = gql`
  query FetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export default function LoggedInUserExample() {
  // Apollo Provider가 Authorization header를 붙인 뒤에만 성공하는 Query예요.
  const { data, loading, error } = useQuery(FETCH_USER_LOGGED_IN);

  // 응답을 기다리는 동안 보여 줄 화면입니다.
  if (loading) return <p>사용자 확인 중</p>;

  // token이 없거나 만료되면 인증 오류가 발생합니다.
  if (error) return <p>로그인이 필요합니다.</p>;

  // 인증에 성공하면 서버가 현재 사용자의 정보를 반환합니다.
  return <p>{data.fetchUserLoggedIn.name}님 반갑습니다.</p>;
}
