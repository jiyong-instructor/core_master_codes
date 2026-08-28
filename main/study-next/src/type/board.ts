// GraphQL API에서 받아오는 게시글들 담을 타입 여기서 정의하고 다른 파일들에서 가져다 재사용합니다.
export type Board = {
  number: number;
  writer: string;
  title: string;
  contents: string;
  like?: number;
  createdAt?: string;
};

// 게시글 목록 조회 결과 모양 타입
export type FetchBoardsData = {
  fetchBoards: Board[];
};

// 게시글 한 개 조회 결과의 모양 타입
export type FetchBoardData = {
  fetchBoard: Board | null;
};

// 등록, 수정, 삭제 결과의 공통 모양 타입
export type BoardMutationResult = {
  number: number;
  message: string;
};
