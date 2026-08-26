# day07 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 화면 밖에 있는 서버와 데이터를 주고받는 방법을 배웠습니다.

처음에는 새로운 단어가 한꺼번에 많이 나와서 복잡하게 느껴질 수 있어요. 하지만 오늘 흐름은 아래 한 줄로 연결됩니다.

> 시간이 필요한 작업은 비동기로 기다리고, 브라우저는 HTTP 요청을 보내며, 서버는 HTTP 응답을 돌려줍니다.

오늘은 아래 순서로 공부합니다.

```text
이벤트 루프
→ Promise
→ async / await
→ HTTP 요청과 응답
→ fetch
→ Axios
→ 서버와 포트
→ CORS
→ Express 서버 직접 실행
```

오늘 예제는 **JavaScript로 작성합니다.**

Day 04에서 TypeScript를 배웠지만, 오늘은 타입보다 아래 흐름을 이해하는 것이 더 중요합니다.

- 브라우저가 서버에 요청을 보내는 순서
- 서버가 응답을 돌려주는 순서
- 비동기 작업을 기다리는 방법
- CORS 오류가 발생하는 이유

함수 분리, 이해하기 쉬운 변수명, `try / catch` 같은 기본 구조는 그대로 지킵니다.
TypeScript는 이후 Next.js와 GraphQL 예제에서 다시 사용합니다.

---

## 1. 먼저 프론트엔드와 백엔드를 구분해 봅시다

프론트엔드는 사용자가 보고 클릭하는 화면을 담당합니다.

- 로그인 입력창을 보여 줍니다.
- 버튼을 클릭했는지 확인합니다.
- 서버에서 받은 게시글을 화면에 그립니다.

백엔드는 화면에서 바로 하면 안 되는 일을 담당합니다.

- 이메일과 비밀번호가 맞는지 확인합니다.
- 데이터베이스에서 게시글을 찾습니다.
- 로그인한 사용자에게 권한이 있는지 확인합니다.
- 처리한 결과를 프론트엔드에 돌려줍니다.

```text
브라우저의 프론트엔드
        │
        │  요청: 게시글 목록을 주세요
        ▼
백엔드 API 서버
        │
        │  응답: 게시글 배열을 줄게요
        ▼
프론트엔드가 받은 배열로 화면을 그림
```

프론트엔드와 백엔드는 서로 다른 프로그램입니다. 그래서 대화하기 위한 공통 규칙이 필요하고, 웹에서는 주로 HTTP라는 규칙을 사용합니다.

---

## 2. 비동기가 필요한 이유

서버 요청, 타이머, 파일 읽기처럼 시간이 걸리는 작업을 모두 기다리면서 멈춰 있다면 화면이 매우 답답해집니다.

```text
서버에 데이터 요청 시작
→ 응답을 기다리는 동안 다른 코드 실행
→ 서버 응답 도착
→ 도착한 데이터 처리
```

이렇게 오래 걸리는 작업을 맡겨 놓고 다음 코드를 실행하는 방식을 비동기라고 합니다.

홈페이지에서는 다음 작업들이 대표적인 비동기 작업입니다.

- 게시글 목록 불러오기
- 로그인 요청 보내기
- 이미지 업로드하기
- 일정 시간 뒤에 배너 바꾸기
- 사용자의 위치 정보 가져오기

---

## 3. 이벤트 루프

`examples/steps/01-event-loop.js`를 실행하기 전에 출력 순서를 먼저 예상해 보세요.

```bash
node examples/steps/01-event-loop.js
```

예상 결과는 아래와 같습니다.

```text
1. 동기 코드 시작
2. 동기 코드 끝
3. Promise.then 실행
4. setTimeout 실행
```

### 왜 setTimeout을 0초로 했는데 마지막일까요?

`0ms`는 지금 실행 중인 코드를 중단하고 즉시 실행하라는 뜻이 아닙니다. 타이머가 끝난 뒤 실행할 함수를 대기열에 넣겠다는 뜻입니다.

다음 네 가지 공간을 알아두면 실행 순서를 설명할 수 있습니다.

1. **Call Stack**: 현재 실행 중인 함수가 쌓이는 곳
2. **Web API 또는 Node API**: 타이머처럼 시간이 걸리는 작업을 대신 처리하는 곳
3. **Microtask Queue**: `Promise.then` 같은 함수가 기다리는 대기열
4. **Task Queue**: `setTimeout` 같은 함수가 기다리는 대기열

Event Loop는 Call Stack이 비었는지 계속 확인합니다. Stack이 비면 Microtask Queue를 먼저 확인하고, 그다음 Task Queue를 확인합니다.

```text
동기 코드 실행 완료
→ Call Stack이 비었는지 확인
→ Promise의 Microtask 실행
→ setTimeout의 Task 실행
```

처음부터 모든 내부 동작을 외울 필요는 없습니다. 오늘은 아래 문장만 확실히 기억해도 충분합니다.

> JavaScript는 동기 코드를 먼저 끝내고, 기다리던 비동기 함수는 나중에 실행합니다.

---

## 4. Promise

Promise는 아직 끝나지 않은 비동기 작업의 결과를 나타내는 객체입니다.

Promise에는 세 가지 상태가 있습니다.

| 상태 | 뜻 |
| --- | --- |
| pending | 아직 작업 중 |
| fulfilled | 작업 성공 |
| rejected | 작업 실패 |

```js
waitOneSecond()
  .then((message) => console.log(message))
  .catch((error) => console.error(error))
  .finally(() => console.log("작업 종료"))
```

- `then`: 성공했을 때 실행합니다.
- `catch`: 실패했을 때 실행합니다.
- `finally`: 성공과 실패에 관계없이 마지막에 실행합니다.

Promise가 없다면 서버 응답이 언제 올지 알 수 없어서 결과를 다루기 어렵습니다.

---

## 5. async와 await

`async/await`는 Promise 코드를 위에서 아래로 읽기 쉽게 작성하도록 도와줍니다.

```js
async function showTrip() {
  try {
    const trip = await getTrip()
    console.log(trip)
  } catch (error) {
    console.log(error)
  }
}
```

- `async`가 붙은 함수는 항상 Promise를 반환합니다.
- `await`는 Promise의 결과가 정해질 때까지 그 함수 안에서 기다립니다.
- `await`는 기본적으로 `async` 함수 안에서 사용합니다.
- 실패할 가능성이 있는 요청은 `try/catch`로 처리합니다.

여기서 중요한 점은 `await`가 브라우저 전체를 멈춘다는 뜻이 아니라는 것입니다. 해당 `async` 함수의 다음 줄이 기다리는 동안 JavaScript는 다른 일을 처리할 수 있습니다.

---

## 6. HTTP 요청과 응답

HTTP는 브라우저와 서버가 대화할 때 사용하는 약속입니다.

요청(Request)에는 보통 아래 정보가 들어갑니다.

- URL: 어느 주소로 보낼지
- Method: 조회, 등록, 수정, 삭제 중 무엇을 할지
- Headers: 데이터 형식, 토큰 같은 추가 정보
- Body: 등록하거나 수정할 실제 데이터

응답(Response)에는 보통 아래 정보가 들어갑니다.

- Status: 요청의 성공 또는 실패 상태
- Headers: 서버가 알려 주는 추가 정보
- Body: 실제 결과 데이터 또는 에러 메시지

```text
POST /trips
Content-Type: application/json

{
  "title": "제주 숙소",
  "place": "제주"
}
```

```text
HTTP 201 Created

{
  "id": 5,
  "title": "제주 숙소",
  "place": "제주"
}
```

---

## 7. HTTP Method

| Method | 주로 사용하는 목적 | 트립토크 예시 |
| --- | --- | --- |
| GET | 데이터 조회 | 게시글 목록 보기 |
| POST | 새 데이터 등록 | 회원가입, 글 등록 |
| PATCH | 데이터 일부 수정 | 게시글 제목 수정 |
| PUT | 데이터 전체 교체 | 전체 정보를 새 값으로 교체 |
| DELETE | 데이터 삭제 | 게시글 삭제 |

REST API에서는 주소와 Method를 함께 보고 기능을 구분합니다.

```text
GET    /trips       숙박권 전체 조회
GET    /trips/1     1번 숙박권 조회
POST   /trips       숙박권 등록
PATCH  /trips/1     1번 숙박권 일부 수정
DELETE /trips/1     1번 숙박권 삭제
```

`/trips/1`이라는 주소가 같더라도 Method가 다르면 하는 일도 달라집니다.

---

## 8. 자주 보는 HTTP 상태 코드

| 상태 코드 | 뜻 | 먼저 확인할 것 |
| --- | --- | --- |
| 200 | 요청 성공 | 응답 데이터 |
| 201 | 새 데이터 등록 성공 | 만들어진 데이터 |
| 400 | 잘못된 요청 값 | 입력값과 Request Body |
| 401 | 인증 실패 또는 로그인 필요 | Access Token |
| 403 | 로그인했지만 권한 없음 | 사용자 권한 |
| 404 | 주소 또는 데이터 없음 | URL과 id |
| 500 | 서버 내부 오류 | 서버 로그와 응답 메시지 |

상태 코드만 보지 말고 Response Body에 담긴 `message`도 같이 확인해야 합니다.

---

## 9. fetch로 GET 요청하기

브라우저에는 HTTP 요청을 보낼 수 있는 `fetch` 함수가 기본으로 들어 있습니다.

```js
const response = await fetch("https://example.com/posts")

if (!response.ok) {
  throw new Error(`요청 실패: ${response.status}`)
}

const posts = await response.json()
```

fetch의 결과를 사용할 때는 아래 순서로 보면 좋습니다.

1. `fetch`로 요청을 보냅니다.
2. `response.ok`로 HTTP 요청 성공 여부를 확인합니다.
3. `response.json()`으로 JSON 응답을 JavaScript 값으로 바꿉니다.
4. 바꾼 데이터를 화면이나 콘솔에서 사용합니다.

fetch는 404나 500 응답을 받아도 서버와 통신 자체는 끝났다고 판단할 수 있습니다. 따라서 `response.ok`를 직접 확인하는 습관이 중요합니다.

---

## 10. fetch로 POST 요청하기

```js
const response = await fetch("https://example.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "제주 여행",
  }),
})
```

- `method`: 어떤 일을 요청할지 정합니다.
- `Content-Type`: 보내는 데이터가 JSON이라고 알려 줍니다.
- `JSON.stringify`: JavaScript 객체를 JSON 문자열로 바꿉니다.
- `body`: 서버로 보낼 데이터를 담습니다.

서버 쪽에서는 `express.json()` 미들웨어가 이 JSON 문자열을 다시 JavaScript 객체로 바꿔 줍니다.

---

## 11. Axios

Axios도 HTTP 요청을 보내는 라이브러리입니다. 브라우저의 기본 기능은 아니므로 프로젝트에 설치해야 합니다.

```bash
yarn add axios
```

GET 요청은 아래처럼 작성합니다.

```js
import axios from "axios"

const response = await axios.get("https://example.com/posts")
console.log(response.data)
```

POST 요청은 아래처럼 작성합니다.

```js
const response = await axios.post("https://example.com/posts", {
  title: "제주 여행",
})
```

### fetch와 Axios의 차이

| 확인할 내용 | fetch | Axios |
| --- | --- | --- |
| 별도 설치 | 필요 없음 | 필요함 |
| JSON 응답 | `response.json()` 필요 | `response.data` 사용 |
| 객체 전송 | `JSON.stringify`를 자주 사용 | 객체를 바로 전달 가능 |
| 404·500 처리 | `response.ok` 직접 확인 | 기본적으로 catch로 이동 |

어느 것이 무조건 더 좋다는 의미는 아닙니다. 회사나 프로젝트의 약속에 맞춰 사용하면 됩니다.

이번 예제의 순서는 아래와 같습니다.

- `07-axios-get.js`: Axios로 목록 조회
- `08-axios-post.js`: Axios로 새 데이터 등록
- `09-local-api-client.js`: 직접 만든 Express API 호출
- `10-http-error.js`: 404, 서버 미실행 등의 에러 구분

---

## 12. 서버와 포트

한 컴퓨터에서 여러 서버 프로그램이 동시에 실행될 수 있습니다. 포트는 어느 프로그램과 대화할지 구분하는 번호입니다.

```text
http://localhost:3000  Next.js 개발 서버
http://localhost:4000  오늘 만든 Express API 서버
```

서버가 실행되지 않았는데 `localhost:4000`으로 요청하면 응답을 받을 수 없습니다.

오류가 나면 아래 세 가지를 먼저 확인합니다.

1. 서버를 실행했는가?
2. URL이 정확한가?
3. 포트 번호가 정확한가?

---

## 13. Origin

Origin은 아래 세 가지의 조합입니다.

```text
http://localhost:3000
│      │         └ port
│      └ host
└ protocol
```

셋 중 하나만 달라도 다른 Origin입니다.

```text
http://localhost:3000  프론트엔드
http://localhost:4000  백엔드
```

두 주소는 host가 같지만 port가 다르므로 서로 다른 Origin입니다.

---

## 14. CORS

CORS는 브라우저가 다른 Origin의 서버 응답을 프론트엔드 코드에 전달해도 되는지 확인하는 규칙입니다.

Express 서버에서는 아래처럼 허용할 프론트엔드 주소를 정할 수 있습니다.

```js
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)
```

중요한 점은 CORS 허용 헤더를 API 서버가 응답에 넣어야 한다는 것입니다. 프론트엔드의 fetch나 Axios 옵션에 `Access-Control-Allow-Origin`을 마음대로 넣는 것으로 해결하지 않습니다.

### Preflight 요청

브라우저는 실제 요청 전에 서버가 이 요청을 허용하는지 `OPTIONS` 요청으로 먼저 물어볼 때가 있습니다. 이것을 Preflight라고 합니다.

```text
브라우저: OPTIONS 요청을 보내도 될까요?
서버: localhost:3000은 허용합니다.
브라우저: 그러면 실제 POST 요청을 보낼게요.
```

개발자 도구 Network 탭에서 같은 주소의 `OPTIONS` 요청이 먼저 보일 수 있습니다. 오류가 아니라 브라우저가 안전을 확인하는 정상 과정일 수도 있습니다.

### CORS와 다른 오류를 구분하기

- CORS: 서버의 허용 Origin 설정을 확인합니다.
- 404: URL과 데이터 번호를 확인합니다.
- 400: 보낸 입력값과 Body를 확인합니다.
- 500: 서버 코드와 서버 터미널 로그를 확인합니다.
- Network Error: 서버 실행 여부와 포트를 확인합니다.

모든 API 오류가 CORS는 아닙니다.

---

## 15. Express 서버 실행하기

오늘 만든 서버는 아래 폴더에 있습니다.

```text
examples/express-server
├── data
│   └── trips.js
├── package.json
├── README.md
└── server.js
```

`trips.js`는 아직 데이터베이스를 배우기 전이라 배열을 임시 데이터로 사용합니다.

터미널에서 아래 순서로 실행합니다.

```bash
cd examples/express-server
npm install
npm run dev
```

서버가 켜지면 브라우저에서 아래 주소를 확인합니다.

```text
http://localhost:4000/health
http://localhost:4000/trips
http://localhost:4000/trips/1
http://localhost:4000/trips?place=제주
```

GET은 주소창으로도 확인할 수 있지만 POST, PATCH, DELETE는 Axios, Thunder Client, Postman 같은 도구를 이용하는 편이 쉽습니다.

서버를 종료하려면 서버가 실행 중인 터미널에서 `Control + C`를 누릅니다.

---

## 16. Proxy는 무엇인가요?

Proxy는 브라우저와 실제 API 서버 사이에서 요청을 대신 전달하는 중간 통로입니다.

```text
브라우저
→ 같은 Origin의 Next Route Handler
→ 실제 외부 API 서버
```

Proxy는 다음 상황에서 사용할 수 있습니다.

- 브라우저가 직접 외부 API를 호출하지 않게 하고 싶을 때
- 서버에서 쿠키나 헤더를 정리해서 전달하고 싶을 때
- 외부 API 주소를 한 곳에서 관리하고 싶을 때

하지만 Proxy가 잘못된 비밀번호, 틀린 URL, 꺼진 서버, 잘못 작성한 Query까지 자동으로 고쳐 주는 것은 아닙니다.

---

## 17. Network 탭에서 오류 찾는 순서

API가 동작하지 않으면 화면의 에러 문장만 보지 말고 개발자 도구의 Network 탭을 엽니다.

아래 순서대로 확인하면 원인을 찾기 쉬워집니다.

1. **URL**: 요청 주소와 포트가 맞는가?
2. **Method**: GET, POST 등을 맞게 사용했는가?
3. **Status**: 200, 400, 404, 500 중 무엇인가?
4. **Request Payload**: 서버로 보낸 값이 맞는가?
5. **Response**: 서버가 어떤 메시지를 돌려줬는가?
6. **Console**: CORS나 JavaScript 오류가 있는가?
7. **서버 터미널**: Express 서버에 에러가 출력됐는가?

---

## 오늘의 핵심

1. 오래 걸리는 작업은 비동기로 처리하여 다른 JavaScript 코드가 계속 실행될 수 있게 합니다.
2. 이벤트 루프는 Call Stack과 비동기 대기열의 실행 순서를 관리합니다.
3. Promise는 비동기 작업의 성공과 실패를 표현합니다.
4. async/await를 사용하면 Promise 코드를 순서대로 읽기 쉽게 작성할 수 있습니다.
5. 브라우저는 HTTP Request를 보내고 서버는 HTTP Response를 돌려줍니다.
6. URL과 Method를 함께 보고 API가 하는 일을 구분합니다.
7. fetch는 `response.ok`와 `response.json()`을 직접 확인합니다.
8. Axios는 응답 데이터를 `response.data`에서 확인합니다.
9. 포트가 다르면 서로 다른 서버이고 Origin도 달라질 수 있습니다.
10. CORS는 다른 Origin의 응답을 브라우저가 사용할 수 있는지 검사하는 규칙입니다.

---

## 한 번 해보기

1. 이벤트 루프 예제의 출력 순서를 실행 전에 적어 보세요.
2. `setTimeout`을 두 개 추가하고 어떤 것이 먼저 나올지 예상해 보세요.
3. fetch GET 결과에서 처음 5개의 제목만 출력해 보세요.
4. Axios GET 요청의 주소를 잘못 입력하고 에러를 확인해 보세요.
5. Express 서버에서 `GET /trips/1`과 `GET /trips/999`의 상태 코드를 비교해 보세요.
6. POST로 숙박권을 하나 추가한 뒤 GET으로 다시 조회해 보세요.
7. Express 서버를 끈 뒤 Axios 요청을 보내 Network Error를 확인해 보세요.
8. CORS의 `origin`을 다른 포트로 바꾼 뒤 브라우저 콘솔을 확인해 보세요.

오늘 용어가 많았지만 결국은 **요청을 보내고, 기다리고, 응답을 확인하는 과정**입니다. 코드에서 URL, Method, 보내는 값, 받는 값을 한 단계씩 찾으면 훨씬 덜 어렵게 느껴질 거예요 ㅎㅎ
