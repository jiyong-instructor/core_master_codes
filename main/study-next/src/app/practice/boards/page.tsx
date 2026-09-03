"use client";

import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  FetchBoardsCountDocument,
  FetchBoardsWithSearchDocument,
} from "@/src/gql/graphql";
import styles from "../practice.module.css";

const PAGE_SIZE = 10;
const PAGE_GROUP_SIZE = 5;

export default function PracticeBoardsPage() {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const boardsResult = useQuery(FetchBoardsWithSearchDocument, {
    variables: { page, search },
    context: { apiName: "practice" },
  });
  const countResult = useQuery(FetchBoardsCountDocument, {
    variables: { search },
    context: { apiName: "practice" },
  });

  const totalCount = countResult.data?.fetchBoardsCount ?? 0;
  const lastPage = Math.ceil(totalCount / PAGE_SIZE);
  const startPage =
    Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const pages = Array.from(
    { length: PAGE_GROUP_SIZE },
    (_, index) => startPage + index,
  ).filter((pageNumber) => pageNumber <= lastPage);

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearch(keyword);
  };

  return (
    <main className={styles.page}>
      <div className={styles.titleArea}>
        <p>PAGINATION + SEARCH</p>
        <h1>게시판 검색과 페이지네이션</h1>
        <span>목록 API와 전체 개수 API를 함께 사용해요.</span>
      </div>

      <form className={styles.searchRow} onSubmit={onSubmitSearch}>
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="제목을 검색해 주세요."
        />
        <button type="submit">검색</button>
      </form>

      <section className={styles.boardList}>
        {boardsResult.loading && (
          <p className={styles.message}>불러오는 중...</p>
        )}
        {boardsResult.error && (
          <p className={styles.message}>{boardsResult.error.message}</p>
        )}
        {boardsResult.data?.fetchBoards.map((board, index) => (
          <article className={styles.boardRow} key={board._id}>
            <span>{totalCount - (page - 1) * PAGE_SIZE - index}</span>
            <strong>{board.title}</strong>
            <span>{board.writer}</span>
            <time>{board.createdAt.slice(0, 10).replaceAll("-", ".")}</time>
          </article>
        ))}
      </section>
      <nav className={styles.pagination} aria-label="게시판 페이지">
        <button
          type="button"
          disabled={startPage === 1}
          onClick={() => setPage(startPage - 1)}
        >
          ‹
        </button>
        {pages.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            className={page === pageNumber ? styles.active : ""}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          disabled={startPage + PAGE_GROUP_SIZE > lastPage}
          onClick={() => setPage(startPage + PAGE_GROUP_SIZE)}
        >
          ›
        </button>
      </nav>
    </main>
  );
}
