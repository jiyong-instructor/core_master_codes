import { gql } from "@apollo/client";

// 게시글 목록을 조회하는 Query 입니다.
export const FETCH_BOARDS = gql`
  query FetchBoards($page: Int) {
    fetchBoards(page: $page) {
      number
      writer
      title
      contents
      like
      createdAt
    }
  }
`;

// 번호로 게시글 한 개를 조회하는 Query
export const FETCH_BOARD = gql`
  query FetchBoard($number: Int!) {
    fetchBoard(number: $number) {
      number
      writer
      title
      contents
      like
      createdAt
    }
  }
`;

// 새로운 게시글을 등록하는 Mutation
export const CREATE_BOARD = gql`
  mutation CreateBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      number
      message
    }
  }
`;

// 기존 게시글을 수정하는 Mutation
export const UPDATE_BOARD = gql`
  mutation UpdateBoard(
    $number: Int
    $writer: String
    $title: String
    $contents: String
  ) {
    updateBoard(
      number: $number
      writer: $writer
      title: $title
      contents: $contents
    ) {
      number
      message
    }
  }
`;

// 번호로 게시글 한 개를 삭제하는 Mutation
export const DELETE_BOARD = gql`
  mutation DeleteBoard($number: Int!) {
    deleteBoard(number: $number) {
      number
      message
    }
  }
`;
