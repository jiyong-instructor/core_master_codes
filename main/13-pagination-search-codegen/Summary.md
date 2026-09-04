# Day 13 오늘 배운 내용 정리

안녕하세요! 오늘은 트립토크 과제에 바로 적용할 **게시판 페이지네이션·검색**, **숙박권 분류·검색**을 연결하고 마지막에 Codegen을 소개합니다.

## 오늘의 전체 흐름

```text
게시판 페이지 번호 클릭
  → page 변경
  → fetchBoards와 fetchBoardsCount 조회

숙박권 분류 또는 검색어 선택
  → search 변경
  → fetchTravelproducts 다시 조회

GraphQL 문서 작성
  → Codegen 실행
  → 생성된 타입 사용
```

## 예제 보는 순서

1. `steps/01-page-buttons.tsx` — 페이지 버튼 만들기
2. `steps/02-page-group.tsx` — 1~10처럼 페이지 묶음 만들기
3. `steps/03-query-page.tsx` — 게시판 Query에 page 전달하기
4. `steps/04-controlled-search.tsx` — 검색어를 state에 저장하기
5. `steps/05-debounce-search.tsx` — 입력이 멈춘 뒤 검색하기
6. `steps/06-search-and-page.tsx` — 게시판 검색과 페이지 함께 사용하기
7. `steps/07-total-page.ts` — 게시글 전체 개수로 마지막 페이지 계산하기
8. `steps/08-travel-operations.graphql` — 게시판·숙박권 Codegen 문서
9. `steps/09-generated-type.tsx` — 생성된 타입 사용하는 모습
10. `steps/10-provider.tsx` — Apollo Provider 위치 확인

합쳐진 모습은 아래 파일에서 확인합니다.

- `Pagination.tsx`
- `SearchInput.tsx`
- `BoardSearchPagination.tsx`
- `TravelProductSearch.tsx`
- `codegen.ts`
- `folder-guide.md`

## Codegen은 왜 사용하나요?

GraphQL Playground에는 어떤 필드와 타입이 있는지 서버가 알고 있습니다.
Codegen은 우리가 작성한 Query와 서버 스키마를 읽고 TypeScript 타입을 만들어줍니다.

```text
우리가 작성한 .graphql 파일
  + 서버 스키마
  → 자동 생성 TypeScript 타입
```

자동 생성 파일은 결과만 확인하고 직접 수정하지 않습니다. GraphQL 문장을 바꿨다면 `npm run codegen`을 다시 실행합니다.

## 과제 API에서 꼭 설명할 점

- 게시판은 `fetchBoardsCount(search)`가 있으므로 정확한 마지막 페이지를 계산할 수 있습니다.
- 숙박권 목록은 별도의 `category` 인자가 없습니다.
- 따라서 아파트·호텔 같은 분류 버튼은 현재 API에서는 선택한 글자를 `search`로 보내는 연습으로 만듭니다.
- 실제 서비스라면 백엔드에 카테고리 필드와 필터 인자를 별도로 요청하는 것이 정석입니다.

## study-next에서 같이 코딩할 페이지

- `/practice/boards` — 검색 버튼, 전체 개수, 5개 페이지 묶음
- `/practice/travelproducts` — 예약 가능 상품, 분류 버튼, 검색

```bash
npm install -D @graphql-codegen/cli @graphql-codegen/client-preset
npm run codegen
```

]
