# Day 11 오늘 배운 내용 정리

안녕하세요! 오늘은 강의용 API에서 한 단계 더 나아가 **과제용 API의 목록·상세·댓글·대댓글 흐름**을 연결합니다.

Day 09에는 Apollo로 게시글 목록, 등록, 수정을 연습했습니다.
오늘은 새로운 문법을 많이 추가하기보다 이미 배운 `useQuery`, `useMutation`, `variables`, `map`이 실제 서비스에서 어떻게 이어지는지 확인합니다.

## 오늘의 전체 흐름

```text
상품 목록 조회
  → 상품 ID를 주소에 넣기
  → 상세 조회
  → 상세 상품의 댓글 등록
  → 부모 댓글 ID로 대댓글 등록
  → 댓글 아래 대댓글 목록 조회
```

## 예제 보는 순서

1. `steps/01-map-list.tsx` — 배열을 `map`으로 출력하기
2. `steps/02-dynamic-link.tsx` — 상품 ID를 상세 주소에 넣기
3. `steps/03-dynamic-page.tsx` — 동적 라우트의 ID 확인하기
4. `steps/04-query-state.tsx` — loading, error, empty 처리하기
5. `steps/05-detail-variable.tsx` — ID를 Query variables로 전달하기
6. `steps/06-list-to-detail.tsx` — 목록에서 상세까지 연결하기
7. `steps/07-create-question.tsx` — 상세 상품에 댓글 등록하기
8. `steps/08-question-answer.tsx` — 댓글 안의 대댓글을 한 번 더 `map`으로 출력하기
9. `steps/09-create-answer.tsx` — 부모 댓글 ID를 보내 대댓글 등록하기
10. `steps/10-answer-list.tsx` — 부모 댓글 아래의 대댓글만 조회하기

합쳐진 모습은 아래 파일에서 확인합니다.

- `TravelProductList.tsx`
- `TravelProductDetail.tsx`
- `QuestionList.tsx`
- `queries.ts`

- 목록과 상세는 서로 다른 API지만, 목록에서 받은 `_id`가 두 화면을 연결합니다.
- 댓글은 아무 곳에나 등록하는 것이 아니라 `travelproductId`를 함께 보내야 합니다.
- 대댓글은 부모 댓글의 ID를 기준으로 연결됩니다.
- 과제 API 이름에서는 댓글을 `Question`, 대댓글을 `QuestionAnswer`라고 부릅니다.
- GraphQL에서는 필요한 필드만 직접 적어서 받아옵니다.
- 처음부터 모든 기능을 한 컴포넌트에 넣지 않고 목록, 상세, 댓글을 나눠서 확인합니다.

## 댓글과 대댓글을 쉽게 설명하면

```text
여행 상품 1개
└─ 댓글 1
   ├─ 대댓글 1
   └─ 대댓글 2
```

대댓글도 글이지만 어느 댓글 아래에 들어갈지 알려주기 위해 **부모 댓글 ID**가 하나 더 필요합니다.

## 오늘은 여기까지만

수정·삭제·`refetchQueries`는 Day 12에서 이어서 다룹니다.
오늘은 “ID가 목록 → 상세 → 댓글 → 대댓글까지 연결된다”는 흐름을 이해하는 것이 가장 중요합니다.
