"use client";

import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS = gql`
  query FetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;

type Board = {
  _id: string;
  writer: string;
  title: string;
};

export default function BoardList() {
  const { data, loading, error } = useQuery(FETCH_BOARDS);

  if (loading) return <p>게시글을 불러오는 중이에요.</p>;
  if (error) return <p>게시글을 불러오지 못했어요.</p>;

  return (
    <ul>
      {data.fetchBoards.map((board: Board) => (
        <li key={board._id}>
          {board.title} - {board.writer}
        </li>
      ))}
    </ul>
  );
}
