"use client";

import { gql, useQuery } from "@apollo/client/react";
import { useState } from "react";

const FETCH_BOARD = gql`
  query FetchBoardsByPage($page: Int) {
    fetchBoards(page: $page) {
      _id
      title
    }
  }
`;

export default function QueryPage() {
  const [page, setPage] = useState(1);
  const { data } = useQuery(FETCH_BOARD, {
    variables: { page },
  });

  return (
    <section>
      <button onClick={() => setPage(1)}>1페이지</button>
      <button onClick={() => setPage(2)}>2페이지</button>

      {data?.fetchBoards.map((board: { _id: string; title: string }) => (
        <p key={board._id}>{board.title}</p>
      ))}
    </section>
  );
}
