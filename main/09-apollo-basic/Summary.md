# day09 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 Playground에서 성공한 GraphQL 문서를 Next 화면으로 가져왔습니다. Apollo Client를 만들고 Provider로 감싼 뒤 `useQuery`, `useMutation`, variables, loading·error·empty 상태를 연결했어요.

오늘 흐름은 이렇게 기억하면 좋아요.  
**Apollo Client 만들기 → Provider로 공유하기 → gql 문서 작성하기 → useQuery로 조회하기 → useMutation으로 변경하기 → 화면 상태 나누기**

## 1. GraphQL과 Apollo Client의 역할

```text
GraphQL
→ 서버와 주고받는 Query·Mutation 문법

Apollo Client
→ 요청 전송, loading/error 상태, cache, 다시 조회를 관리하는 도구
```

Apollo가 GraphQL을 대신하는 것이 아니라 GraphQL 요청을 React에서 편하게 사용할 수 있게 도와줘요.

## 2. ApolloClient 만들기

`steps/01-provider.tsx`에서 API 주소와 cache를 설정했습니다.

```tsx
const client = new ApolloClient({
  uri: \"GRAPHQL_EXAMPLE_API_URL\",
  cache: new InMemoryCache(),
})
```

- `uri`: 요청을 보낼 GraphQL endpoint
- `cache`: 받아온 결과를 메모리에 보관하는 설정

처음에는 example API 주소를 사용하고 로그인 이후 practice API로 옮깁니다.

## 3. ApolloProvider

Hook을 사용할 컴포넌트보다 위에서 Provider로 감싸야 해요.

```tsx
<ApolloProvider client={client}>
  {children}
</ApolloProvider>
```

App Router에서는 Provider 자체가 React context를 사용하므로 Client Component로 만들고 root layout의 children을 감쌀 수 있습니다.

## 4. gql 문서

Playground에서 성공한 문서를 `gql` 안으로 옮깁니다.

```tsx
const FETCH_BOARDS = gql`
  query FetchBoards {
    fetchBoards {
      _id
      title
    }
  }
`
```

요청문이 길어지면 `steps/06-operation-separate.ts`처럼 별도 파일로 옮겨 화면 코드와 분리할 수 있어요.

## 5. useQuery

```tsx
const { data, loading, error } = useQuery(FETCH_BOARDS)
```

- `loading`: 요청을 기다리는 중
- `error`: 요청 실패 정보
- `data`: 성공한 응답

첫 렌더링에는 data가 아직 없을 수 있으므로 바로 `data.fetchBoards`를 읽지 않도록 loading을 먼저 처리하거나 optional chaining을 사용해요.

## 6. Query variables

```tsx
useQuery(FETCH_BOARD, {
  variables: { boardId },
})
```

Playground Variables와 같은 key를 사용합니다. GraphQL 문서의 `$boardId`, API argument의 `boardId`, Apollo variables의 `boardId` 흐름을 한 줄씩 비교해주세요.

## 7. useMutation

```tsx
const [deleteBoard, { loading }] = useMutation(DELETE_BOARD)

await deleteBoard({
  variables: { boardId, password },
})
```

`useMutation`은 실행할 함수와 실행 상태를 돌려줘요. Query는 화면이 열릴 때 실행할 수 있지만 Mutation은 보통 버튼 event 안에서 직접 실행합니다.

## 8. 네 가지 화면 상태

API 화면은 다음 네 상태를 생각하면 안정적이에요.

1. loading: 요청 중
2. error: 실패
3. empty: 성공했지만 배열이 비어 있음
4. success: 사용할 데이터가 있음

`steps/05-empty-list.tsx`처럼 empty는 error가 아니라 정상적인 결과예요.

## 9. cache의 첫 이해

Apollo는 응답 객체의 type과 ID를 이용해 cache에 저장할 수 있습니다. 같은 데이터를 다시 사용할 때 cache가 먼저 보일 수 있어요.

오늘은 cache를 직접 수정하지 않습니다. “서버 data와 화면 사이에서 Apollo가 결과를 기억할 수 있다” 정도로 이해하고 Day 12에 refetch를 배워요.

## 10. 오늘 자주 만난 오류

- Provider 밖에서 Apollo Hook을 사용하면 client를 찾지 못해요.
- Playground 주소와 Apollo `uri`가 다르면 결과도 달라져요.
- Query variable 이름이 문서와 다르면 필수 값 오류가 나요.
- loading 중 data를 바로 읽으면 undefined 오류가 날 수 있어요.
- Mutation 함수를 만들기만 하고 event에서 실행하지 않으면 요청이 가지 않아요.

## 오늘의 핵심

1. Apollo Client는 GraphQL 요청과 서버 상태를 관리해요.
2. ApolloProvider 아래에서 Apollo Hook을 사용해요.
3. `gql` 안의 요청은 Playground에서 먼저 검증해요.
4. `useQuery`는 data, loading, error를 제공해요.
5. `useMutation`은 event에서 실행할 함수를 제공해요.
6. variables key는 GraphQL 변수 선언과 맞아야 해요.
7. loading, error, empty, success 화면을 나눠요.

## 한번 해보기

- 게시글 전체 개수 Query를 화면에 표시해보세요.
- 입력한 ID로 상세 게시글을 조회해보세요.
- Mutation 버튼에 loading 중 다른 글자를 보여줘보세요.
- empty 배열일 때 안내 문장을 보여줘보세요.
- GraphQL 문서를 별도 파일로 옮겨 import해보세요.

Apollo 코드가 복잡해 보일 때는 `요청문`, `Hook`, `variables`, `화면 상태` 네 부분으로 나눠 읽어보세요 ㅎㅎ
