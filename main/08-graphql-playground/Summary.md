# day08 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 GraphQL을 처음 시작했습니다. Playground의 Docs에서 사용할 API를 찾고 Query와 Mutation을 실행했으며 Variables, input, 응답의 `data`와 `errors`, alias와 fragment까지 순서대로 확인했어요.

오늘 흐름은 이렇게 기억하면 좋아요.  
**Docs에서 API 이름 찾기 → 필요한 인자 확인하기 → 받고 싶은 field 고르기 → Variables 넣기 → data와 errors 읽기**

## 1. GraphQL은 무엇인가요?

GraphQL은 데이터베이스 이름이 아니라 클라이언트와 API 서버가 요청하고 응답하는 문법과 실행 방식입니다.

```text
브라우저 또는 Apollo Client
→ GraphQL 문서 전송
→ GraphQL API 서버
→ 요청한 field 모양으로 JSON 응답
```

TripTalk에서는 이미 만들어진 GraphQL 서버를 사용합니다. 프론트엔드는 schema에 존재하는 API와 type을 확인해 올바른 요청을 작성해요.

## 2. REST와 GraphQL 비교

```text
REST
GET /boards
GET /boards/게시글ID

GraphQL
POST /graphql
query FetchBoards { ... }
query FetchBoard($boardId: ID!) { ... }
```

GraphQL은 보통 같은 endpoint로 요청하고 문서 안의 Query·Mutation 이름과 field로 원하는 작업을 표현합니다.

## 3. schema와 Docs

Playground의 Docs에는 서버가 제공하는 약속이 들어 있어요.

- 사용할 수 있는 Query와 Mutation 이름
- 필요한 argument 이름과 타입
- input 안에 넣을 수 있는 field
- 응답 객체에서 선택할 수 있는 field
- `!`가 붙은 필수 값

API 이름을 추측하기 전에 Docs에서 먼저 검색하는 습관이 중요해요.

## 4. 가장 작은 Query

`steps/01-simple-query.graphql`에서는 게시글 목록을 조회했습니다.

```graphql
query FetchBoards {
  fetchBoards {
    _id
    writer
    title
  }
}
```

- `query FetchBoards`: 작업 종류와 우리가 붙인 작업 이름
- `fetchBoards`: 서버 schema에 있는 API 이름
- 중괄호 안 field: 응답에서 받고 싶은 값

## 5. Variables

상세 조회처럼 ID가 필요한 요청은 값을 문서 밖 Variables 영역으로 분리할 수 있어요.

```graphql
query FetchBoard($boardId: ID!) {
  fetchBoard(boardId: $boardId) {
    title
  }
}
```

```json
{
  "boardId": "실제_게시글_ID"
}
```

첫 줄에서 변수의 타입을 선언하고, API argument에 같은 변수를 전달합니다.

## 6. Mutation과 input

`steps/03-create-mutation.graphql`에서는 게시글을 등록했습니다.

```graphql
mutation CreateBoard($input: CreateBoardInput!) {
  createBoard(createBoardInput: $input) {
    _id
    title
  }
}
```

input은 관련된 여러 값을 객체 하나로 묶어 전달하는 타입입니다. Docs에서 input 이름뿐 아니라 안쪽 필수 field도 열어 확인해야 해요.

## 7. 수정과 삭제의 순서

수정과 삭제에는 기존 데이터의 ID가 필요합니다.

```text
등록 Mutation 실행
→ 응답의 새 ID 복사
→ 상세 Query로 조회
→ 같은 ID로 수정 Mutation
→ 다시 상세 Query로 확인
→ 마지막에 삭제 Mutation
```

ID를 임의의 숫자로 넣는 것이 아니라 서버가 돌려준 실제 ID를 사용해요.

## 8. 응답의 data와 errors

성공하면 보통 `data`, 실패하면 `errors`가 보입니다.

```json
{
  "errors": [
    { "message": "잘못된 게시글 ID입니다." }
  ],
  "data": null
}
```

오류가 나면 message뿐 아니라 `path`, `locations`, extension의 code도 함께 보면 어느 field에서 실패했는지 찾기 쉬워요.

## 9. alias와 fragment

`steps/05-alias-fragment.graphql`은 선택 심화에 가까운 문법입니다.

- alias: 같은 API를 여러 번 호출할 때 응답 이름을 구분
- fragment: 반복되는 field 묶음을 재사용

처음 Query와 Mutation이 익숙하지 않다면 이 예제는 읽기만 하고 넘어가도 괜찮아요.

## 10. Playground 실행 순서

1. Docs에서 정확한 API 이름을 찾습니다.
2. argument와 input type을 확인합니다.
3. 받고 싶은 최소 field를 선택합니다.
4. Variables JSON에 실제 값을 넣습니다.
5. 실행 후 data 또는 errors를 확인합니다.
6. 등록 결과 ID로 다음 조회를 이어갑니다.

## 11. 오늘 자주 만난 오류

- `$boardId`를 선언하고 API에 전달하지 않으면 사용하지 않은 변수 오류가 나요.
- `ID!`인데 Variables에 값을 빼면 필수 변수 오류가 나요.
- Variables는 JavaScript 객체가 아니라 올바른 JSON이라 key에 큰따옴표가 필요해요.
- 응답 객체 field를 하나도 고르지 않으면 Query가 완성되지 않아요.
- example API에서 만든 ID를 practice API에 사용할 수 없어요.

## 오늘의 핵심

1. GraphQL은 API 요청 문법이며 DB 자체가 아니에요.
2. Query는 조회, Mutation은 변경 요청이에요.
3. Docs는 서버가 제공하는 schema를 읽는 장소예요.
4. field를 선택해 필요한 응답 모양을 정해요.
5. Variables로 문서와 실제 값을 분리해요.
6. input은 여러 값을 하나의 객체로 묶은 타입이에요.
7. 성공 결과는 data, 실패 이유는 errors에서 확인해요.

## 한번 해보기

- 목록 Query에 `contents` field를 추가해보세요.
- 게시글을 등록하고 응답 ID로 상세 조회해보세요.
- 제목만 수정한 뒤 다시 조회해보세요.
- 필수 Variables 하나를 일부러 빼고 오류를 읽어보세요.
- 두 게시글을 alias로 한 요청에서 조회해보세요.

GraphQL은 요청문을 외우는 수업이 아니에요. Docs에서 이름과 타입을 찾아 조립하는 방법을 익히는 것이 핵심입니다 ㅎㅎ
