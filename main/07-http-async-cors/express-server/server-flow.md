# 브라우저와 서버의 대화

## 1. 프로그램 두 개를 따로 실행합니다

```text
프론트엔드 서버                         백엔드 서버
http://localhost:3000                  http://localhost:4000

┌─────────────────────┐               ┌─────────────────────┐
│ Next.js 또는 React   │   Request     │ Express             │
│ 화면, 버튼, 입력창   │ ────────────▶ │ 검사, 처리, 데이터   │
│                     │ ◀──────────── │                     │
└─────────────────────┘   Response    └─────────────────────┘
```

- 브라우저는 사용자의 요청을 프론트엔드 코드에 전달합니다.
- 프론트엔드는 필요한 데이터를 백엔드에 요청합니다.
- 백엔드는 요청을 검사하고 처리합니다.
- 백엔드는 상태 코드와 데이터를 응답으로 돌려줍니다.
- 프론트엔드는 받은 데이터로 화면을 다시 그립니다.

## 2. Request에서 확인할 것

```text
POST http://localhost:4000/trips
```

| 항목 | 예시 | 의미 |
| --- | --- | --- |
| URL | `/trips` | 어느 API를 부를지 |
| Method | `POST` | 등록할지 조회할지 |
| Header | `Content-Type: application/json` | 보내는 데이터의 정보 |
| Body | `{ "title": "제주 숙소" }` | 서버에 보낼 실제 데이터 |

## 3. Response에서 확인할 것

```text
201 Created
```

| 항목 | 예시 | 의미 |
| --- | --- | --- |
| Status | `201` | 요청 처리 결과 |
| Header | `Content-Type: application/json` | 받은 데이터의 정보 |
| Body | `{ "id": 5, "title": "제주 숙소" }` | 서버가 돌려준 실제 데이터 |

## 4. Origin과 CORS

Origin은 protocol, host, port의 조합입니다.

```text
http://localhost:3000
│      │         └ port
│      └ host
└ protocol
```

```text
http://localhost:3000  프론트엔드 Origin
http://localhost:4000  백엔드 Origin
```

두 주소는 port가 다르므로 서로 다른 Origin입니다. 브라우저는 백엔드가 현재 프론트엔드 Origin을 허용했는지 확인합니다.

```text
브라우저: localhost:3000에서 온 요청을 허용하나요?
서버: 네, 이 주소는 허용했습니다.
브라우저: 그러면 응답을 프론트엔드 코드에 전달할게요.
```

서버가 허용하지 않았다면 응답이 실제로 서버에서 왔더라도 브라우저가 프론트엔드 코드에 전달하지 않을 수 있습니다.

## 5. Preflight

브라우저는 실제 요청 전에 `OPTIONS` 요청을 보내 허용 여부를 먼저 확인할 수 있습니다.

```text
OPTIONS로 허용 여부 확인
→ 서버의 CORS 응답 확인
→ 실제 POST, PATCH, DELETE 요청 전송
```

Network 탭에 `OPTIONS`가 보인다고 무조건 오류는 아닙니다.

## 6. 오류를 구분하는 간단한 기준

| 보이는 현상 | 먼저 확인할 것 |
| --- | --- |
| CORS 문구 | Express의 `cors` origin 설정 |
| 404 | URL과 데이터 id |
| 400 | Request Body의 입력값 |
| 500 | Express 터미널의 서버 에러 |
| Network Error | 서버 실행 여부와 포트 |
| 401 | 로그인 토큰 |

## 7. Proxy

Proxy는 요청을 대신 전달하는 중간 서버입니다.

```text
브라우저
→ Next.js의 Route Handler
→ 실제 API 서버
```

Proxy는 요청 경로와 쿠키 흐름을 정리할 때 사용할 수 있지만 틀린 비밀번호나 없는 데이터까지 고쳐 주지는 않습니다.
