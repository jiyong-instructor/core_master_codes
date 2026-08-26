// express는 Node.js에서 HTTP 서버를 쉽게 만들도록 도와주는 라이브러리입니다.
import express from "express";

// cors는 다른 출처의 프론트엔드 요청을 허용할 때 사용하는 미들웨어입니다.
import cors from "cors";

// 임시 데이터베이스로 쓸 data 폴더에 준비한 데이터 배열을 가져옵니다.
import { trips } from "./data/trips.js";

// express 함수를 실행하여 서버 애플리케이션을 만듭니다.
const app = express();
const PORT = 4000; // 프론트엔드와 겹치지 않도록 백엔드 서버는 4000번 포트를 사용합니다.

// localhost:3000에서 오는 브라우저 요청을 허용합니다.
app.use(
  cors({
    // Next.js 개발 서버의 출처
    origin: "http://localhost:3000", // 허용할 출처를 명시합니다.
    // 나중에 쿠키를 주고받을 수 있도록 허용합니다.
    credentials: true, // 쿠키를 허용합니다.
  }),
);

// 요청 body로 들어온 JSON 문자열을 자바스크립트 객체로 바꿔 줍니다.
app.use(express.json());

// 서버가 정상적으로 켜져 있는지 확인하는 가장 간단한 API입니다.
app.get("/health", (request, response) => {
  response.json({ message: "서버가 정상적으로 실행 중입니다." }); // 요청한 쪽에 상태 메시지를 JSON으로 돌려줍니다.
});

// GET /trips 요청이 오면 숙박권 전체 목록을 돌려줍니다.
app.get("/trips", (request, response) => {
  // 주소의 ?place=제주처럼 전달된 검색어를 읽습니다.
  const place = request.query.place;

  // 검색어가 없다면 전체 숙박권 배열을 바로 돌려줍니다.
  if (!place) {
    response.json(trips); // response.json은 객체나 배열을 JSON 응답으로 바꾸어 보냅니다.
    return;
  }

  // 검색어가 있다면 해당 place를 포함하는 숙박권만 필터링하여 돌려줍니다.
  const filteredTrips = trips.filter((trip) => trip.place.includes(place));
  // 검색한 결과 배열을 요청한 프론트엔드에 돌려줍니다.
  response.json(filteredTrips);
});

// GET /trips/1처럼 주소에 번호를 넣으면 숙박권 한 개를 돌려줍니다.
app.get("/trips/:id", (request, response) => {
  // 주소로 들어온 id는 문자열이므로 숫자로 바꿉니다.
  const tripId = Number(request.params.id);

  // 배열에서 같은 id를 가진 숙박권을 찾습니다.
  const trip = trips.find((item) => item.id === tripId);

  // 같은 번호의 숙박권이 없다면 404 응답을 보냅니다.
  if (!trip) {
    // status(404)는 응답의 HTTP 상태 코드를 404로 정합니다.
    response.status(404).json({ message: "해당 숙박권을 찾을 수 없습니다." });
    return;
  }
  // 찾은 숙박권 객체를 JSON으로 돌려줍니다.
  response.json(trip);
});

// POST /trips 요청이 오면 새 숙박권을 등록합니다.
app.post("/trips", (request, response) => {
  // 프론트엔드가 body에 담아 보낸 값을 꺼냅니다.
  const { title, place, price, description } = request.body; // body에서 필요한 값을 구조분해 할당으로 꺼냅니다.

  // 필수 값인 제목과 장소가 비어 있는지 검사합니다.
  if (!title || !place) {
    // 잘못된 입력이므로 400 상태 코드와 안내 메시지를 보냅니다.
    response.status(400).json({ message: "제목과 장소는 필수 입력입니다." });
    return;
  }

  // 배열 마지막 번호보다 1 큰 값을 새 번호로 사용합니다.
  const newId = trips.length === 0 ? 1 : trips[trips.length - 1].id + 1;

  // 서버에 저장할 새 숙박권 객체를 만듭니다.
  const newTrip = {
    // 서버에서 만든 새 번호를 넣습니다.
    id: newId,
    // 프론트엔드가 보낸 제목을 넣습니다.
    title,
    // 프론트엔드가 보낸 장소를 넣습니다.
    place,
    // 가격이 없다면 0을 기본값으로 넣습니다.
    price: price ?? 0,
    // 설명이 없다면 빈 문자열을 기본값으로 넣습니다.
    description: description ?? "",
  };

  // 임시 데이터베이스 배열의 마지막에 새 숙박권을 추가합니다.
  trips.push(newTrip);
  // 새로 추가한 숙박권 객체를 프론트에게 JSON으로 돌려줍니다.
  response.status(201).json(newTrip);
});

// PATCH /trips/1 요청이 오면 1번 숙박권의 일부를 수정합니다.
app.patch("/trips/:id", (request, response) => {
  // 주소로 받은 id를 숫자로 바꿉니다.
  const tripId = Number(request.params.id);

  // 수정할 숙박권이 배열의 몇 번째에 있는지 찾습니다.
  const tripIndex = trips.findIndex((item) => item.id === tripId);

  // 같은 번호의 숙박권이 없다면 -1이 나오므로 404를 보냅니다.
  if (tripIndex === -1) {
    response.status(404).json({ message: "해당 숙박권을 찾을 수 없습니다." });
    return;
  }

  // 기존 숙박권과 새로 받은 값을 합쳐 수정된 객체를 만듭니다.
  const updatedTrip = {
    // 기존 데이터의 모든 값을 먼저 복사합니다.
    ...trips[tripIndex],
    // body로 들어온 값만 기존 값 위에 덮어씁니다.
    ...request.body,
    // id는 body로 바꾸지 못하도록 원래 번호를 마지막에 다시 넣습니다.
    id: tripId,
  };
  // 배열의 기존 숙박권을 수정된 숙박권으로 교체합니다.
  trips[tripIndex] = updatedTrip;
  // 수정된 숙박권 객체를 프론트에게 JSON으로 돌려줍니다.
  response.json(updatedTrip);
});

// DELETE /trips/1 요청이 오면 1번 숙박권을 삭제합니다.
app.delete("/trips/:id", (request, response) => {
  // 주소로 받은 id를 숫자로 바꿉니다.
  const tripId = Number(request.params.id);

  // 삭제할 숙박권이 배열의 몇 번째에 있는지 찾습니다.
  const tripIndex = trips.findIndex((item) => item.id === tripId);

  // 같은 번호의 숙박권이 없다면 404 응답을 보냅니다.
  if (tripIndex === -1) {
    // 삭제할 데이터가 없다는 메시지를 보냅니다.
    response.status(404).json({ message: "삭제할 숙박권이 없습니다." });

    // 404 응답을 보낸 뒤 함수를 끝냅니다.
    return;
  }

  // splice로 배열에서 숙박권 한 개를 삭제하고 삭제된 값을 받습니다.
  const deletedTrips = trips.splice(tripIndex, 1);

  // 배열의 첫 번째 값이 실제로 삭제된 숙박권입니다.
  const deletedTrip = deletedTrips[0];

  // 삭제 결과와 삭제된 데이터를 함께 돌려줍니다.
  response.json({ message: "숙박권이 삭제되었습니다.", deletedTrip });
});

// 위에 등록하지 않은 주소로 요청이 들어왔을 때 실행됩니다.
app.use((request, response) => {
  // 존재하지 않는 API 주소라는 뜻의 404 응답을 보냅니다.
  response.status(404).json({ message: "존재하지 않는 API주소입니다." });
});

// 서버를 실행할 포트 번호를 지정하고 서버를 시작합니다.
app.listen(PORT, () => {
  // 서버가 켜지면 터미널에 접속 주소를 안내합니다.
  console.log(`Express 서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
