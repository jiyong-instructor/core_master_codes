// HTTP 요청은 항상 성공하지 않으므로 에러 처리 방법도 알아야 합니다.
import axios from "axios";

// 존재하지 않는 숙박권을 일부러 조회하는 함수입니다.
async function getNonExistentTrip() {
  try {
    // 우리 Express 서버에는 999번 숙박권이 없다고 가정합니다.
    const reponse = await axios.get("http://localhost:4000/trips/999");

    // 성공한다면 서버가 999번 숙박권을 반환한 것입니다.
    console.log("숙박권 조회 성공:", reponse.data);
  } catch (error) {
    // axios가 만든 에러인지 먼저 확인합니다.
    if (axios.isAxiosError(error)) {
      // 응답이 있다면 서버까지 요청은 도착했고 서버가 에러를 보낸 것입니다.
      if (error.response) {
        // 404, 400, 500과 같은 HTTP 상태 코드를 확인합니다.
        console.log("HTTP 상태 코드:", error.response.status);

        // 서버가 함께 보내 준 에러 메시지를 확인합니다.
        console.log("서버 메시지:", error.response.data);

        // 현재 에러 처리를 마치고 함수를 끝냅니다.
        return;
      }

      // 요청은 보냈지만 응답을 받지 못했다면 서버 실행 여부를 확인합니다.
      if (error.request) {
        // 서버가 꺼져 있거나 주소 또는 포트가 다를 때 자주 보게 됩니다.
        console.log("서버 응답이 없습니다. localhost:4000을 확인해 주세요.");

        // 현재 에러 처리를 마치고 함수를 끝냅니다.
        return;
      }
    }

    // axios 외의 예상하지 못한 에러는 마지막에 따로 확인합니다.
    console.log("알 수 없는 에러:", error);
  }
}

// 함수를 호출하여 에러 처리 결과를 확인합니다.
getNonExistentTrip();

// [에러를 구분하는 기준]
// 404: 주소는 맞지만 요청한 데이터가 없습니다.
// 400: 입력한 데이터가 서버의 규칙에 맞지 않습니다.
// 500: 서버 코드에서 문제가 발생했습니다.
// CORS: 서버 응답을 브라우저가 프론트엔드 코드에 전달하지 않습니다.
// Network Error: 서버가 꺼졌거나 주소·포트가 틀렸을 수 있습니다.
