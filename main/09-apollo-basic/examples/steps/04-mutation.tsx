"use client";

import { gql, useMutation } from "@apollo/client";

const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: ID!, $password: String!) {
    deleteBoard(boardId: $boardId, password: $password)
  }
`;

export default function DeleteBoardExample({ boardId }: { boardId: string }) {
  const [deleteBoard, { loading }] = useMutation(DELETE_BOARD);

  async function handleDelete() {
    await deleteBoard({ variables: { boardId, password: "1234" } });
    alert("삭제했습니다.");
  }

  return <button disabled={loading} onClick={handleDelete}>{loading ? "삭제 중" : "삭제"}</button>;
}
