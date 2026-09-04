"use client";

// 실제 프로젝트에서는 Codegen이 만든 타입을 generated.ts에서 가져옵니다.
import type {
  FetchBoardsWithSearchQuery,
  FetchBoardsWithSearchQueryVariables,
} from "@/gql/graphql";

type BoardListProps = {
  data?: FetchBoardsWithSearchQuery;
  variables: FetchBoardsWithSearchQueryVariables;
};

export default function BoardList({ data, variables }: BoardListProps) {
  return (
    <div>
      <p>요청한 페이지: {variables.page}</p>
      {data?.fetchBoards.map((board) => (
        <p key={board.id}>{board.title}</p>
      ))}
    </div>
  );
}
