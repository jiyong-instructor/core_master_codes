// JavaScript는 기본적으로 한 번에 한 줄씩 실행해요.
// 지금 실행 중인 함수들이 쌓이는 공간을 Call Stack이라고 불러요.
console.log("1. 동기 코드 시작");

// setTimeout은 "지금 바로 실행"하는 함수가 아니에요.
// 브라우저 또는 Node.js에게 timer 작업을 맡기는 함수예요.
setTimeout(() => {
  // 0ms가 지나면 이 함수는 Task Queue라는 대기열로 이동해요.
  // Call Stack의 동기 코드가 모두 끝난 다음에야 실행될 수 있어요.
  console.log("4. setTimeout 실행");
}, 0);

// Promise.resolve는 곧바로 성공한 Promise를 만들어요.
Promise.resolve().then(() => {
  // then의 함수는 Microtask Queue라는 대기열로 이동해요.
  // Microtask Queue는 setTimeout이 기다리는 Task Queue보다 먼저 확인해요.
  console.log("3. Promise.then 실행");
});

// 위의 비동기 함수들이 기다리는 동안 다음 동기 코드는 계속 실행돼요.
console.log("2. 동기 코드 끝");

// 예상 출력 순서: 1 → 2 → 3 → 4
//
// 수업에서 이렇게 설명하면 돼요.
// 1. 동기 코드는 Call Stack에서 위에서 아래로 실행돼요.
// 2. timer 작업은 브라우저 또는 Node.js가 대신 기다려줘요.
// 3. 완료된 callback은 Queue에서 자기 차례를 기다려요.
// 4. Event Loop는 Call Stack이 비었는지 계속 확인해요.
// 5. Stack이 비면 Microtask Queue, Task Queue 순서로 함수를 가져와요.
