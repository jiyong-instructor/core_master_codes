// 서버에서 게시글 목록을 받아오는 함수예요.
async function getPosts() {
  // fetch의 첫 번째 인자에는 요청을 보낼 API 주소를 적어요.
  // method를 생략하면 기본값인 GET 요청이 전송돼요.
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  // response.ok는 상태 코드가 200번대인지 알려주는 boolean 값이에요.
  if (response.ok === false) {
    // fetch는 404와 500에서도 직접 오류를 던지지 않아 우리가 확인해요.
    throw new Error(`HTTP 오류: ${response.status}`);
  }

  // response.json()도 비동기 작업이므로 await로 기다려요.
  // JSON 문자열을 JavaScript 배열과 객체로 바꿔줘요.
  const posts = await response.json();

  // 완성된 게시글 배열을 함수를 호출한 곳으로 돌려줘요.
  return posts;
}

// 예제 실행 순서를 한눈에 보기 위해 별도의 함수를 만들어요.
async function showPosts() {
  // getPosts가 끝나 게시글 배열을 돌려줄 때까지 기다려요.
  const posts = await getPosts();

  // slice(0, 3)으로 앞에서부터 게시글 세 개만 확인해요.
  console.log(posts.slice(0, 3));
}

// 만든 함수를 호출해 GET 요청을 시작해요.
showPosts();
