"use client";

type Board = {
  _id: string;
  title: string;
};

export default function BoardResult({ boards }: { boards: Board[] }) {
  // 요청 성공과 데이터 없음은 다른 상태이므로 별도 화면을 보여줘요.
  if (boards.length === 0) return <p>등록된 게시글이 없어요.</p>;

  return (
    <ul>
      {boards.map((board) => <li key={board._id}>{board.title}</li>)}
    </ul>
  );
}
