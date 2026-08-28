"use client";

import { gql, useQuery } from "@apollo/client";

const FETCH_BOARD_COUNT = gql`
  query FetchBoardCount {
    fetchBoardsCount
  }
`;

export default function QueryStatesExample() {
  const { data, loading, error } = useQuery(FETCH_BOARD_COUNT);

  // API 화면은 loading, error, success를 나눠서 생각해요.
  if (loading) return <p>게시글 개수를 불러오는 중이에요.</p>;
  if (error) return <p>오류: {error.message}</p>;
  return <p>전체 게시글: {data.fetchBoardsCount}개</p>;
}
