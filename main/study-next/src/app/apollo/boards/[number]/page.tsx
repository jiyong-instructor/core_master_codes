"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client/react";
import { DELETE_BOARD, FETCH_BOARD } from "@/src/graphql/boards";
import type { BoardMutationResult, FetchBoardData } from "@/src/type/board";
import styles from "../boards.module.css";

type FetchBoardVariables = {
  number: number;
};

type DeleteBoardData = {
  deleteBoard: BoardMutationResult;
};

type DeleteBoardVariables = {
  number: number;
};

export default function BoardDetailPage() {
  const params = useParams<{ number: string }>();
  const router = useRouter();

  // 주소의 [number]는 문자열이므로 GraphQL에 보내기 전에 숫자로 바꿉니다.
  const boardNumber = Number(params.number);

  const { data, loading, error } = useQuery<
    FetchBoardData,
    FetchBoardVariables
  >(FETCH_BOARD, {
    variables: { number: boardNumber },
    fetchPolicy: "network-only",
  });

  const [deleteBoard, { loading: deleting }] = useMutation<
    DeleteBoardData,
    DeleteBoardVariables
  >(DELETE_BOARD);

  const onClickDelete = async () => {
    const isConfirmed = confirm("정말 이 게시글을 삭제할까요?");
    if (!isConfirmed) return;

    try {
      const result = await deleteBoard({
        variables: { number: boardNumber },
      });

      alert(result.data?.deleteBoard.message || "게시글을 삭제했습니다.");
      router.push("/apollo/boards");
    } catch (deleteError) {
      console.error(deleteError);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return <main className={styles.page}>게시글을 불러오는 중입니다.</main>;
  }

  if (error || !data?.fetchBoard) {
    return (
      <main className={`${styles.page} ${styles.error}`}>
        게시글을 찾을 수 없습니다.
      </main>
    );
  }

  const board = data.fetchBoard;

  return (
    <main className={styles.page}>
      <Link className={styles.backLink} href="/apollo/boards">
        ← 게시글 목록
      </Link>

      <article className={styles.detail}>
        <h1 className={styles.detailTitle}>{board.title}</h1>
        <div className={styles.detailInfo}>
          <span>작성자: {board.writer}</span>
          <span>{board.createdAt?.slice(0, 10) || "-"}</span>
        </div>
        <p className={styles.detailContents}>{board.contents}</p>

        <div className={styles.detailButtons}>
          <Link
            className={styles.secondaryButton}
            href={`/apollo/boards/${board.number}/edit`}
          >
            수정
          </Link>
          <button
            className={styles.deleteButton}
            disabled={deleting}
            onClick={onClickDelete}
          >
            {deleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </article>
    </main>
  );
}
