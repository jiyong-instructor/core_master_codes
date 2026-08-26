// 이 함수는 나중에 여행 이름을 돌려주는 비동기 함수예요.
function getTripName() {
  // Promise.resolve는 성공한 Promise를 간단히 만들어요.
  return Promise.resolve("제주 바다 여행");
}

// 함수 앞에 async를 붙이면 함수 안에서 await를 사용할 수 있어요.
async function showTripName() {
  // try 안에는 성공할 것으로 예상하는 코드를 적어요.
  try {
    // await는 Promise가 끝날 때까지 이 async 함수 안에서 기다려요.
    // JavaScript 전체를 멈추는 것이 아니라 이 함수의 다음 줄만 기다려요.
    const tripName = await getTripName();

    // await가 성공하면 Promise 안의 문자열이 변수에 담겨요.
    console.log(tripName);
  } catch (error) {
    // await한 Promise가 실패하면 catch로 이동해요.
    console.error("여행을 불러오지 못했어요.", error);
  } finally {
    // 성공과 실패에 관계없이 공통으로 실행할 코드를 적어요.
    console.log("여행 정보 조회 시도 종료");
  }
}

// async 함수를 호출해 비동기 작업을 시작해요.
showTripName();

// async/await를 홈페이지에서는 주로 다음 상황에 사용해요.
// 로그인 요청을 기다릴 때
// 게시글 목록을 불러올 때
// 상품을 등록하거나 수정한 결과를 기다릴 때
// 이미지 업로드가 끝나기를 기다릴 때
