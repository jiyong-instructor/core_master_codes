# Postman 연습용 REST API — jsonplaceholder

GraphQL Playground에서 연습한 게시글 CRUD와 똑같은 흐름을 REST 방식으로 비교해볼 수 있어요.
`https://jsonplaceholder.typicode.com`은 가짜 데이터를 응답해주는 무료 테스트 서버라서, 실제로 데이터가 저장되지는 않지만 요청 방법과 응답 모양을 연습하기에 좋아요.

## 1. 목록 조회 — GET

```
GET https://jsonplaceholder.typicode.com/posts
```

GraphQL의 `fetchBoards` Query와 같은 역할이에요. Body 없이 주소만으로 요청해요.

## 2. 한 개 조회 — GET + 경로 변수

```
GET https://jsonplaceholder.typicode.com/posts/1
```

GraphQL의 `fetchBoard(boardId: $boardId)`와 비교되는 부분이에요. GraphQL은 Variables로 ID를 보내지만, REST는 주소(path) 안에 ID를 직접 넣어요.

## 3. 등록 — POST

```
POST https://jsonplaceholder.typicode.com/posts
Content-Type: application/json
```

Body (raw JSON):

```json
{
  "title": "GraphQL과 비교하는 REST 게시글",
  "body": "Postman에서 등록 요청을 연습해요.",
  "userId": 1
}
```

GraphQL의 `createBoard` Mutation과 같은 역할이에요. GraphQL은 `createBoardInput`처럼 input 객체로 감싸서 보내지만, REST는 Body에 값만 바로 넣어요.

## 4. 수정 — PUT / PATCH

전체 수정 (PUT, 모든 field를 다시 보내야 해요):

```
PUT https://jsonplaceholder.typicode.com/posts/1
Content-Type: application/json
```

```json
{
  "id": 1,
  "title": "수정한 제목",
  "body": "수정한 내용입니다.",
  "userId": 1
}
```

일부만 수정 (PATCH, 바꾸고 싶은 field만 보내면 돼요):

```
PATCH https://jsonplaceholder.typicode.com/posts/1
Content-Type: application/json
```

```json
{
  "title": "제목만 살짝 수정"
}
```

GraphQL의 `updateBoard` Mutation은 `updateBoardInput`에 바뀐 값만 넣으면 되니 PATCH와 더 비슷해요.

## 5. 삭제 — DELETE

```
DELETE https://jsonplaceholder.typicode.com/posts/1
```

GraphQL의 `deleteBoard` Mutation과 같은 역할이에요.

## 6. 연관 데이터 조회 — 게시글의 댓글

```
GET https://jsonplaceholder.typicode.com/posts/1/comments
```

GraphQL의 `fetchTravelproductQuestions(travelproductId: ...)`처럼 부모 ID로 자식 목록을 조회하는 것과 같은 패턴이에요. REST는 주소 경로 자체가 계층을 표현해요.

## 7. 그 외 연습해볼 만한 endpoint

| 목적                | REST 주소             |
| ------------------- | --------------------- |
| 회원 목록           | `GET /users`          |
| 회원 한 명          | `GET /users/1`        |
| 할 일 목록          | `GET /todos`          |
| 특정 유저의 할 일만 | `GET /todos?userId=1` |
| 앨범 목록           | `GET /albums`         |
| 사진 목록           | `GET /photos`         |

`?userId=1`처럼 주소 뒤에 붙는 부분을 query string이라고 해요. GraphQL의 argument와 비슷하게 조건을 걸 때 사용해요.

## GraphQL vs REST 한눈에 비교

| 구분              | REST (jsonplaceholder)                    | GraphQL (main-example)          |
| ----------------- | ----------------------------------------- | ------------------------------- |
| 주소              | 자원마다 다른 주소 (`/posts`, `/posts/1`) | 항상 같은 주소 (`/graphql`)     |
| 조회할 field 선택 | 불가능 (서버가 정해준 모양 그대로)        | 가능 (필요한 field만 골라 요청) |
| 요청 구분 방법    | HTTP method (GET/POST/PUT/PATCH/DELETE)   | 문서 안 Query/Mutation 이름     |
| 값 전달 위치      | 주소 경로, query string, Body             | Variables                       |
| 성공/실패 표시    | HTTP status code (200, 404, 500 등)       | 응답 Body의 `data` / `errors`   |

## Postman에서 연습할 때 순서

1. `GET /posts`로 목록을 먼저 받아봐요.
2. 목록에서 본 `id` 값으로 `GET /posts/{id}` 상세를 요청해요.
3. `POST /posts`로 등록하고 응답에서 새 `id`를 확인해요. (jsonplaceholder는 실제 저장은 안 해요)
4. `PATCH /posts/1`로 일부 field만 수정해봐요.
5. `DELETE /posts/1`로 삭제 요청을 보내고 status code를 확인해요.

같은 CRUD 흐름을 GraphQL Playground와 Postman 양쪽에서 실행해보면 두 방식의 차이가 훨씬 잘 느껴져요 ㅎㅎ
