// 이번에는 인터넷의 테스트 API가 아니라 직접 만든 Express 서버를 호출합니다.
// 먼저 examples/express-server 폴더에서 npm run dev를 실행해야 합니다.

// axios 라이브러리를 가져옵니다.
import axios from "axios";

// 우리가 만든 서버의 공통 주소.
const API_URL = "http://localhost:4000";

// 숙박권 전체 목록을 조회하는 함수.
async function getTrips() {
  const response = await axios.get(`${API_URL}/trips`);
  return response.data;
}

// 새 숙박권 하나를 등록하는 함수.
async function createTrip(newTrip) {
  const response = await axios.post(`${API_URL}/trips`, newTrip);
  return response.data;
}

// 조회와 등록을 순서대로 실행하는 함수
async function runLocalApiExample() {
  const trips = await getTrips();
  console.log("전체 숙박권 목록:", trips);

  // 서버로 보낼 새 숙박권 객체를 만들어요.
  const newTrip = {
    title: "부산 바다 앞 숙소",
    place: "부산",
    price: 48000,
    description: "바다를 보며 쉴 수 있는 숙소입니다.",
  };
  const createdTrip = await createTrip(newTrip);
  console.log("새로 등록된 숙박권:", createdTrip);
}

// 예제 함수를 실행합니다.
runLocalApiExample();

// [홈페이지에서는 언제 사용할까요?]
// 목록 페이지가 열릴 때 getTrips를 호출할 수 있습니다.
// 숙박권 등록 버튼을 눌렀을 때 createTrip을 호출할 수 있습니다.
