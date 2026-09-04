# Day 14 오늘 배운 내용 정리

오늘은 Next.js 과정의 마지막 날입니다.

1. Zustand로 여러 컴포넌트가 같은 값을 공유하기
2. refresh token cookie로 access token 복구하기
3. TanStack Query(React Query)로 REST API의 서버 상태 관리하기

세 가지를 한 문장으로 구분하면 다음과 같습니다.

```text
Zustand      → 여러 화면이 함께 사용하는 클라이언트 상태
React Query  → API에서 받아온 서버 상태와 cache
Apollo       → GraphQL 요청과 GraphQL cache
```

---

## 1. 설치

```bash
npm install zustand @tanstack/react-query
```

패키지를 설치한 뒤 개발 서버가 실행 중이었다면 다시 시작합니다.

---

## 2. Zustand가 왜 필요한가요?

로그인 token처럼 멀리 떨어진 여러 컴포넌트가 같은 값을 사용하면 props를 계속 전달하기 어려워집니다.
Zustand는 컴포넌트 바깥에 작은 공용 저장소(store)를 만들 수 있게 해 줍니다.

```text
useState  → 한 컴포넌트 안에서 주로 사용하는 상태
props     → 부모가 자식에게 전달하는 값
Context   → React가 제공하는 공용 값 전달 방법, Provider 필요
Zustand   → 외부 store를 만들어 필요한 컴포넌트에서 선택해서 사용
```

모든 값을 전역으로 만들 필요는 없습니다. 입력창 한 개처럼 한 화면에서만 쓰는 값은 `useState`가 더 단순합니다.

```text
로그인 페이지 ─┐
헤더          ├─ auth store의 같은 accessToken 사용
마이페이지    ┘
```

```ts
import { create } from "zustand";

type CountStore = {
  count: number;
  increase: () => void;
};

export const useCountStore = create<CountStore>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));
```

- `create`: store를 만듭니다.
- `count`: 여러 컴포넌트가 함께 읽을 상태입니다.
- `increase`: 상태를 변경하는 함수입니다.
- `set`: store의 상태를 변경합니다.
- selector: 컴포넌트가 필요한 값만 골라서 사용합니다.

```tsx
const count = useCountStore((store) => store.count);
const increase = useCountStore((store) => store.increase);
```

---

## 3. access token과 refresh token

```text
access token
- 일반 인증 API 요청에 사용
- Authorization header에 넣음
- 비교적 수명이 짧음

refresh token
- 새 access token을 발급받을 때 사용
- 보통 HttpOnly cookie에 저장
- 프론트 JavaScript에서 직접 읽지 않음
```

프론트에서 페이지 이동만 막는 것은 보안이 아닙니다.
실제 권한은 백엔드 API도 반드시 검사해야 합니다.

---

## 4. 로그인 복구 순서

```text
로그인 성공
  → access token은 Zustand store에 저장
  → refresh token은 서버가 cookie에 저장
  → 새로고침하면 Zustand의 access token은 사라짐
  → cookie를 담아 restoreAccessToken 요청
  → 새 access token을 store에 다시 저장
  → 인증 확인 완료
```

refresh token 문자열을 variables에 직접 담는 것이 아닙니다.
브라우저가 cookie를 보내도록 HTTP link에 `credentials: "include"`를 설정합니다.

```ts
const httpLink = new HttpLink({
  uri: "/api/graphql",
  credentials: "include",
});
```

---

## 5. 인증 준비 상태가 필요한 이유

페이지가 처음 열린 순간에는 정말 로그아웃인지, 재발급 요청을 기다리는 중인지 알 수 없습니다.

```text
isAuthReady === false  → 로그인 확인 중
isAuthReady === true + token 없음 → 로그아웃
isAuthReady === true + token 있음 → 로그인
```

재발급 성공과 실패 모두 마지막에는 준비 상태를 `true`로 바꿉니다.

```ts
try {
  const result = await restoreAccessToken();
  setAccessToken(result.data?.restoreAccessToken.accessToken ?? "");
} catch {
  setAccessToken("");
} finally {
  finishAuth();
}
```

---

## 6. React Query가 왜 필요한가요?

`useEffect + fetch + useState`로도 데이터를 받을 수 있지만 아래 내용을 직접 작성해야 합니다.

- 로딩 상태
- 오류 상태
- 받아온 데이터 저장
- 같은 데이터를 다시 요청할지 결정
- 이전 결과 cache

React Query는 이 서버 상태를 관리해 줍니다.

```tsx
const { data, isPending, isError, refetch } = useQuery({
  queryKey: ["todos"],
  queryFn: getTodos,
});
```

- `queryKey`: cache를 구분하는 이름표
- `queryFn`: 실제 API 요청 함수
- `data`: 성공한 응답 데이터
- `isPending`: 첫 응답을 기다리는 상태
- `isError`: 요청 실패 상태
- `refetch`: 같은 요청 다시 실행

---

## 7. Provider

React Query hook은 `QueryClientProvider` 안에서 사용합니다.

```tsx
"use client";

const [queryClient] = useState(() => new QueryClient());

return (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
```

Next.js App Router에서는 Provider가 Context를 사용하므로 클라이언트 컴포넌트로 만듭니다.

---

## 8. Apollo와 React Query 비교

| 구분          | Apollo Client     | React Query               |
| ------------- | ----------------- | ------------------------- |
| 이번 수업 API | GraphQL           | REST                      |
| 조회          | Apollo `useQuery` | React Query `useQuery`    |
| 요청 작성     | `gql` 문서        | `fetch` 또는 `axios` 함수 |
| cache 이름    | GraphQL 필드 중심 | `queryKey`                |
| 다시 조회     | `refetchQueries`  | `invalidateQueries`       |

둘 다 서버 상태 도구입니다. 이름이 같은 hook이 있으므로 import 경로를 꼭 확인합니다.

---

## 예제 보는 순서

1. `examples/zustand-counter-store.ts` — 가장 작은 store
2. `examples/ZustandCounter.tsx` — 두 컴포넌트가 같은 상태 사용
3. `examples/auth-store.ts` — 실제 인증 store
4. `examples/AuthRestore.tsx` — 앱 시작 시 token 복구
5. `examples/ProtectedPage.tsx` — 인증 완료 뒤 보호 페이지 검사
6. `examples/react-query-provider.tsx` — QueryClientProvider 설정
7. `examples/ReactQueryTodos.tsx` — 외부 REST API 조회

`steps` 폴더에는 인증 과정을 한 단계씩 나눈 코드가 있습니다.

## study-next에서 함께 실행할 순서

1. `/final/zustand`에서 숫자를 변경합니다.
2. `/final/zustand/other-page`로 이동해 같은 숫자가 보이는지 확인합니다.
3. 새로고침하여 메모리 상태가 초기화되는 것을 확인합니다.
4. `/auth/login`에서 로그인합니다.
5. `/final/auth-restore`에서 현재 token 상태를 확인합니다.
6. 새로고침하고 cookie를 이용한 로그인 복구를 확인합니다.
7. `/auth/mypage`에서 보호 페이지와 로그아웃을 확인합니다.
8. `/final/triptalk`에서 과제 프로젝트에 옮길 파일 순서를 봅니다.
9. `/final/react-query`에서 REST 서버 상태 예제를 확인합니다.

---

## 자주 만나는 실수

1. Provider 바깥에서 React Query hook 사용
2. Apollo의 `useQuery`와 React Query의 `useQuery` import를 혼동
3. 새로고침 직후 token 복구 전에 로그인 페이지로 이동
4. HTTP link에서 `credentials: "include"` 누락
5. Zustand 상태를 바꿀 때 React의 `setState`와 혼동
6. `fetch` 응답에서 `response.ok`를 검사하지 않음
7. 클라이언트 상태와 서버 상태를 모두 Zustand에 넣으려 함

---

## 오늘의 핵심

1. Zustand는 여러 컴포넌트가 함께 쓰는 간단한 전역 상태를 관리합니다.
2. access token은 store에 두고 refresh token cookie로 다시 발급받을 수 있습니다.
3. 인증 복구가 끝나기 전에는 로그인 여부를 확정하지 않습니다.
4. React Query는 REST API 데이터의 로딩, 오류, cache를 관리합니다.
5. TripTalk의 GraphQL은 Apollo를 그대로 사용하고, React Query는 별도 REST 예제로 비교합니다.

## 공식 문서

- Zustand TypeScript 안내: https://zustand.docs.pmnd.rs/learn/guides/advanced-typescript
- TanStack Query 설치: https://tanstack.com/query/latest/docs/framework/react/installation
- TanStack Query `useQuery`: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
- Apollo Client 인증 link: https://www.apollographql.com/docs/react/networking/authentication
