// Promise는 "나중에 성공 결과 또는 실패 이유를 알려 줄 작업"이에요.
function waitOneSecond() {
  // new Promise로 비동기 작업의 성공과 실패를 표현할 수 있어요.
  return new Promise((resolve, reject) => {
    // setTimeout을 이용해 1초가 걸리는 작업을 흉내 내요.
    setTimeout(() => {
      // 서버 작업이 성공했다고 가정할 값을 만들어요.
      const isSuccess = true;

      // 작업이 성공했다면 resolve에 결과를 넣어요.
      if (isSuccess) {
        // resolve를 호출하면 Promise의 상태가 fulfilled가 돼요.
        resolve("1초 기다리기 완료");
        // 성공했으므로 여기서 함수를 끝내요.
        return;
      }

      // 작업이 실패했다면 reject에 Error를 넣어요.
      reject(new Error("기다리는 중 오류가 발생했어요."));
    }, 1000);
  });
}

// 함수를 호출하면 지금은 결과 문자열이 아니라 Promise가 반환돼요.
waitOneSecond()
  // Promise가 성공하면 then이 실행되고 resolve의 값을 받아요.
  .then((message) => {
    // 성공 결과를 콘솔에서 확인해요.
    console.log(message);
  })
  // Promise가 실패하면 catch가 실행되고 reject의 Error를 받아요.
  .catch((error) => {
    // 실패 이유를 콘솔에서 확인해요.
    console.error(error);
  })
  // 성공과 실패에 관계없이 마지막에 finally가 실행돼요.
  .finally(() => {
    // loading 상태를 false로 바꿀 때 finally를 자주 사용해요.
    console.log("비동기 작업 종료");
  });

// Promise 상태는 다음 세 가지예요.
// pending: 아직 작업 중
// fulfilled: resolve가 실행되어 성공
// rejected: reject가 실행되어 실패
