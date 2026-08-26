// Express 서버에서 여행 한개를 조회하는 함수에요.
async function getTrip() {
  // 먼저 examples/express-server에서 npm run dev로 서버를 켜야 해요.
  // 요청을 보낸 뒤 응답이 올 때까지 await로 기다려요.
  const response = await fetch("http://localhost:4000/trips/1");

  // 상태 코드가 200번대가 아니라면 오류로 처리해요.
  if (!response.ok) {
    // throw한 Error는 showTrip의 catch로 이동해요.
    throw new Error(`여행 조회 실패: ${response.status}`);
  }

  // JSON으로 응답을 파싱해요.
  const trip = await response.json();
  return trip;
}

// 조회 결과를 사용하는 함수예요.
async function showTrip() {
  // 성공할 것으로 예상하는 코드를 try 안에 적어요.
  try {
    const trip = await getTrip();
    // 받은 데이터로 실제 화면을 그린다고 생각하면 돼요.
    console.log(`${trip.title} / ${trip.place}`);
  } catch (error) {
    // 오류가 발생하면 여기로 이동해요.
    console.error(error);
  }
}

// 만든 함수를 호출해 전체 비동기 흐름을 시작해요.
showTrip();
