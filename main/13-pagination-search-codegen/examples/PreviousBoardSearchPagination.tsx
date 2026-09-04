"use client";

import { gql, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";

const FETCH_BOARDS = gql`
  query FetchBoardsForPagination($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      title
      writer
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query FetchBoardsCountForPagination($search: String) {
    fetchBoardsCount(search: $search)
  }
`;

export default function BoardSearchPagination() {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const boards = useQuery(FETCH_BOARDS, { variables: { page, search } });
  const count = useQuery(FETCH_BOARDS_COUNT, { variables: { search } });
  const lastPage = Math.ceil((count.data?.fetchBoardsCount ?? 0) / 10);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(keyword);
  }

  return (
    <section>
      <form onSubmit={handleSearch}>
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button>검색</button>
      </form>

      {boards.data?.fetchBoards.map((board: { _id: string; title: string }) => (
        <p key={board._id}>{board.title}</p>
      ))}

      {Array.from({ length: lastPage }, (_, index) => index + 1).map(
        (number) => (
          <button key={number} onClick={() => setPage(number)}>
            {number}
          </button>
        ),
      )}
    </section>
  );
}

// Codegen으로 제너레이트한 타입을 이용한 방식
("use client");

import type {
  FetchBoardsForPaginationQuery,
  FetchBoardsCountForPaginationQuery,
} from "../__generated__/graphql";

type Board = FetchBoardsForPaginationQuery["fetchBoards"][number];

type BoardsCount = FetchBoardsCountForPaginationQuery["fetchBoardsCount"];

export default function BoardSearchPagination({
  data,
  count,
}: {
  data: FetchBoardsForPaginationQuery;
  count: FetchBoardsCountForPaginationQuery;
}) {
  const boards = data.fetchBoards;
  const lastPage = Math.ceil((count.fetchBoardsCount ?? 0) / 10);

  return (
    <section>
      {boards.map((board: Board) => (
        <p key={board._id}>{board.title}</p>
      ))}

      {Array.from({ length: lastPage }, (_, index) => index + 1).map(
        (number) => (
          <button key={number}>{number}</button>
        ),
      )}
    </section>
  );
}
