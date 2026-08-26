// axios는 HTTP 요청을 보내기 위한 라이브러리입니다.
// 이 파일을 실행하기 전 프로젝트에 axios를 설치해야 합니다.
// yarn add axios

// axios에서 기본으로 제공하는 axios 객체를 가져옵니다.
import axios from "axios";

// axios를 사용하여 게시글 목록을 조회하는 함수입니다.
async function getPostsWithAxios() {
  // axios.get(주소) 형태로 GET 요청을 보냅니다.
  // await는 서버 응답이 도착할 때까지 이 함수 안에서 기다립니다.
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
  );

  // axios는 JSON 변환까지 마친 데이터를 response.data에 넣어 줍니다.
  // fetch처럼 response.json()을 따로 호출하지 않아도 됩니다.
  return response.data;
}

// 받아온 게시글 중 일부를 화면 대신 콘솔에서 확인하는 함수입니다.
async function showPosts() {
  // 위에서 만든 조회 함수를 실행하고 결과를 기다립니다.
  const posts = await getPostsWithAxios();

  // 게시글이 100개라서 앞의 3개만 잘라 냅니다.
  const firstThreePosts = posts.slice(0, 3);

  // 개발자 도구 또는 터미널의 콘솔에서 결과를 확인합니다.
  console.log("첫 번째 게시글 3개:", firstThreePosts);
}

// 함수를 호출해야 실제 HTTP 요청이 시작됩니다.
showPosts();

// [수업에서 강조할 점]
// 1. fetch의 결과 데이터: await response.json()
// 2. axios의 결과 데이터: response.data
// 3. 홈페이지에서는 게시판 목록, 상품 목록, 사용자 정보 조회 등에 사용합니다.
