import { gql } from "@apollo/client";

// 회원가입
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      _id
      email
      name
    }
  }
`;

// 로그인
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

// 로그인한 사용자 정보 조회
export const FETCH_USER_LOGGED_IN = gql`
  query FetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        amount
      }
    }
  }
`;

// 로그아웃
export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

// refresh token cookie를 확인해 새 access token을 받습니다.
export const RESTORE_ACCESS_TOKEN = gql`
  mutation RestoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;
