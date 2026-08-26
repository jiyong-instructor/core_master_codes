// axios를 사용하여 서버에 새 데이터를 등록하는 예제입니다.
import axios from "axios";

// 새 게시글 하나를 서버에 등록하는 함수입니다.
async function createPost(newPost) {
  // axios.post(주소, 보낼 데이터) 형태로 작성합니다.
  const response = await axios.post(
    // 데이터를 등록할 API 주소입니다.
    "https://jsonplaceholder.typicode.com/posts",
    // 두 번째 자리에는 서버로 보낼 객체를 넣습니다.
    newPost,
  );

  // 서버가 등록 결과로 돌려준 데이터를 반환합니다.
  return response.data;
}

// 등록 예제를 실행하는 함수입니다.
async function submitPost() {
  // 사용자가 입력했다고 가정할 게시글 객체입니다.
  const newPost = {
    // 임시 작성자 번호입니다.
    userId: 1,
    // 임시 게시글 제목입니다.
    title: "제주도 여행 준비하기",
    // 임시 게시글 내용입니다.
    body: "비행기와 숙소를 먼저 예약했어요.",
  };

  // 새 게시글을 서버에 보내고 등록 결과를 기다립니다.
  const createdPost = await createPost(newPost);

  // 서버가 돌려준 게시글 번호와 데이터를 확인합니다.
  console.log("등록 결과:", createdPost);
}

// 함수를 호출해야 POST 요청이 실제로 시작됩니다.
submitPost();

// [fetch와 비교]
// fetch는 headers와 JSON.stringify를 직접 작성하는 경우가 많습니다.
// axios는 객체를 넘기면 JSON 형태로 바꾸어 보내 주기 때문에 조금 더 짧습니다.
