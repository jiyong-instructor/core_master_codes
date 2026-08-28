"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client/react";
import { FETCH_BOARD, UPDATE_BOARD } from "@/src/graphql/boards";
import type { BoardMutationResult, FetchBoardData } from "@/src/type/board";
import styles from "../../boards.module.css";

type FetchBoardVariables = {
  number: number;
};

type UpdateBoardData = {
  updateBoard: BoardMutationResult;
};

type UpdateBoardVariables = {
  number: number;
  writer: string;
  title: string;
  contents: string;
};

export default function EditBoardPage() {
  const params = useParams<{ number: string }>();
  const boardNumber = Number(params.number);

  const { data, loading } = useQuery<FetchBoardData, FetchBoardVariables>(
    FETCH_BOARD,
    {
      variables: { number: boardNumber },
      fetchPolicy: "network-only",
    },
  );

  if (loading) {
    return <main className={styles.page}>게시글을 불러오는 중입니다.</main>;
  }

  if (!data?.fetchBoard) {
    return (
      <main className={`${styles.page} ${styles.error}`}>
        게시글을 찾을 수 없습니다.
      </main>
    );
  }

  // 응답을 받은 다음 폼을 렌더링 하면 useEffect 없이 기존 값을 state의 첫 값으로 넣을 수 있습니다.
  return (
    <BoardEditForm
      boardNumber={boardNumber}
      initialContents={data.fetchBoard.contents}
      initialTitle={data.fetchBoard.title}
      initialWriter={data.fetchBoard.writer}
    />
  );
}

type BoardEditFormProps = {
  boardNumber: number;
  initialWriter: string;
  initialTitle: string;
  initialContents: string;
};

function BoardEditForm({
  boardNumber,
  initialWriter,
  initialTitle,
  initialContents,
}: BoardEditFormProps) {
  const router = useRouter();
  const [writer, setWriter] = useState(initialWriter);
  const [title, setTitle] = useState(initialTitle);
  const [contents, setContents] = useState(initialContents);

  const [updateBoard, { loading: updating }] = useMutation<
    UpdateBoardData,
    UpdateBoardVariables
  >(UPDATE_BOARD);

  const onClickUpdate = async () => {
    if (!writer || !title || !contents) {
      alert("작성자, 제목, 내용을 모두 입력해 주세요.");
      return;
    }

    try {
      const result = await updateBoard({
        variables: { number: boardNumber, writer, title, contents },
      });

      alert(result.data?.updateBoard.message || "게시글을 수정했습니다.");
      router.push(`/apollo/boards/${boardNumber}`);
    } catch (error) {
      console.error(error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <main className={styles.page}>
      <Link className={styles.backLink} href={`/apollo/boards/${boardNumber}`}>
        ← 게시글 상세
      </Link>

      <div className={styles.top}>
        <div>
          <h1>게시글 수정</h1>
          <p>기존 값을 state에 넣고 updateBoard를 실행합니다.</p>
        </div>
      </div>

      <section className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="writer">작성자</label>
          <input
            id="writer"
            onChange={(event) => setWriter(event.target.value)}
            value={writer}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contents">내용</label>
          <textarea
            id="contents"
            onChange={(event) => setContents(event.target.value)}
            value={contents}
          />
        </div>

        <div className={styles.formButtons}>
          <Link
            className={styles.secondaryButton}
            href={`/apollo/boards/${boardNumber}`}
          >
            취소
          </Link>
          <button
            className={styles.primaryButton}
            disabled={updating}
            onClick={onClickUpdate}
          >
            {updating ? "수정 중..." : "수정하기"}
          </button>
        </div>
      </section>
    </main>
  );
}
