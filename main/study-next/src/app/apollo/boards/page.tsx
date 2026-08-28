"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import styles from "./boards.module.css";
import { FETCH_BOARDS } from "@/src/graphql/boards";
import type { FetchBoardsData } from "@/src/type/board";

type FetchBoardsVariables = {
  page?: number;
};

export default function BoardsPage() {
  // useQuery는 컴포넌트가 화면에 나타날 때 GraphQL Query를 실행합니다.
  const { data, loading, error, refetch } = useQuery<
    // useQuery<타입스크립트 타입>(인자값, {보낼데이터})
    FetchBoardsData,
    FetchBoardsVariables
  >(FETCH_BOARDS, {
    variables: { page: 1 },
    // 페이지 보는 중에, 새로 등록한 글이 바로 보이도록 서버에서 다시 받아올 수 있는 옵션
    fetchPolicy: "network-only", // 항상 서버에서 최신 데이터를 가져옵니다.
  });

  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <div>
          <h1>게시글 목록</h1>
          <p>useQuery로 fetchBoards를 실행한 결과입니다.</p>
        </div>
        <Link className={styles.primaryButton} href="/apollo/boards/new">
          게시글 등록
        </Link>
      </div>

      {/* 요청 중, 실패, 성공 화면을 각각 나누어 보여주면 되요 */}
      {loading && <p className={styles.message}>게시글을 불러오는 중입니다.</p>}

      {/* 에러면 에러 컴포넌트 보여주면 끝. */}
      {error && (
        <div className={`${styles.message} ${styles.error}`}>
          <p>게시글을 불러오지 못했습니다.</p>
          <button className={styles.secondaryButton} onClick={() => refetch()}>
            다시 불러오기
          </button>
        </div>
      )}

      {/* 게시판 목록 잘 받아왔다면, data에 담겼겠죠? */}
      {data && (
        <section className={styles.boardList}>
          <div className={styles.boardHeader}>
            <span className={styles.number}>번호</span>
            <span className={styles.title}>제목</span>
            <span className={styles.writer}>작성자</span>
            <span className={styles.date}>작성일</span>
          </div>

          {data.fetchBoards.map((board) => (
            <Link
              className={styles.boardRow}
              href={`/apollo/boards/${board.number}`}
              key={board.number}
            >
              <span className={styles.number}>{board.number}</span>
              <strong className={styles.title}>{board.title}</strong>
              <span className={styles.writer}>{board.writer}</span>
              <span className={styles.date}>
                {board.createdAt?.slice(0, 10) || "-"}
              </span>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
