"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOARD } from "@/src/graphql/boards";
import type { BoardMutationResult } from "@/src/type/board";
import styles from "../boards.module.css";

type CreateBoardData = {
  createBoard: BoardMutationResult;
};

type CreateBoardVariables = {
  writer: string;
  title: string;
  contents: string;
};

export default function NewBoardPage() {
  const router = useRouter();

  // input에 입력한 값을 각각 state에 저장합니다.
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // useMutation 훅을 사용하여 CREATE_BOARD 뮤테이션을 실행합니다.
  const [createBoard, { loading }] = useMutation<
    CreateBoardData,
    CreateBoardVariables
  >(CREATE_BOARD);

  const onClickCreate = async () => {
    // 빈 값이 있으면 API 요청을 보내기 전에 먼저 막아 줍니다.
    if (!writer || !title || !contents) {
      alert("작성자, 제목, 내용을 모두 입력해 주세요.");
      return;
    }

    try {
      const result = await createBoard({
        variables: {
          writer,
          title,
          contents,
        },
      });
      alert(result.data?.createBoard.message || "게시글이 생성되었습니다.");
      router.push("/apollo/boards"); // 게시글이 등록 되었다면, 다시 게시판 목록으로 보내줍니다.
    } catch (error) {
      console.error(error);
      alert("게시글 생성에 실패했습니다.");
    }
  };

  return (
    <main className={styles.page}>
      <Link className={styles.backLink} href="/apollo/boards">
        ← 게시글 목록
      </Link>

      <div className={styles.top}>
        <div>
          <h1>게시글 등록</h1>
          <p>useMutation으로 createBoard를 실행합니다.</p>
        </div>
      </div>

      <section className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="writer">작성자</label>
          <input
            id="writer"
            onChange={(event) => setWriter(event.target.value)}
            placeholder="작성자를 입력해 주세요."
            value={writer}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목을 입력해 주세요."
            value={title}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contents">내용</label>
          <textarea
            id="contents"
            onChange={(event) => setContents(event.target.value)}
            placeholder="내용을 입력해 주세요."
            value={contents}
          />
        </div>

        <div className={styles.formButtons}>
          <Link className={styles.secondaryButton} href="/apollo/boards">
            취소
          </Link>
          <button
            className={styles.primaryButton}
            disabled={loading}
            onClick={onClickCreate}
          >
            {loading ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </section>
    </main>
  );
}
