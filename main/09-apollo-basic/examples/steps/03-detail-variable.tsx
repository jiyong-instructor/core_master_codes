"use client";

import { gql, useQuery } from "@apollo/client";

const FETCH_BOARD = gql`
  query FetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      title
      contents
    }
  }
`;

export default function BoardDetailExample({ boardId }: { boardId: string }) {
  // Playground의 Variables와 같은 모양으로 Apollo variables를 전달해요.
  const { data } = useQuery(FETCH_BOARD, { variables: { boardId } });
  return <h1>{data?.fetchBoard.title ?? "불러오는 중"}</h1>;
}
