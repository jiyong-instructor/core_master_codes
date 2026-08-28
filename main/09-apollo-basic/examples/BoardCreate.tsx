"use client";

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_BOARD = gql`
  mutation CreateBoard($title: String!) {
    createBoard(
      createBoardInput: {
        writer: "철수"
        password: "1234"
        title: $title
        contents: "반갑습니다."
      }
    ) {
      _id
      title
    }
  }
`;

export default function BoardCreate() {
  const [title, setTitle] = useState("");
  const [createBoard] = useMutation(CREATE_BOARD);

  async function handleCreate() {
    // Playground에서 성공한 variables를 같은 모양으로 전달해요.
    const result = await createBoard({ variables: { title } });
    alert(`${result.data.createBoard.title} 등록 완료!`);
  }

  return (
    <div>
      <input value={title} onChange={(event) => setTitle(event.target.value)} />
      <button onClick={handleCreate}>등록하기</button>
    </div>
  );
}
