"use client";

import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const FETCH_BOARDS = gql`
  query FetchBoardsWithSearch($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      title
    }
  }
`;

export default function SearchAndPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data } = useQuery(FETCH_BOARDS, {
    variables: { page, search },
  });

  function handleSearch(value: string) {
    setSearch(value);

    // 새 검색어를 입력하면 첫 페이지부터 다시 보여줘요.
    setPage(1);
  }

  return (
    <section>
      <input onChange={(event) => handleSearch(event.target.value)} />

      {data?.fetchBoards.map((board: { _id: string; title: string }) => (
        <p key={board._id}>{board.title}</p>
      ))}

      <button onClick={() => setPage((previous) => previous + 1)}>
        다음 페이지
      </button>
    </section>
  );
}
