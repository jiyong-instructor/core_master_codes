import { gql } from "@apollo/client";

// 요청문을 별도 파일로 옮기면 화면 코드가 짧아져요.
export const FETCH_BOARDS = gql`
  query FetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;
