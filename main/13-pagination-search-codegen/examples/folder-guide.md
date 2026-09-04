# 파일 위치를 이렇게 생각해요

```text
src/
├── app/
│   └── practice/
│       ├── boards/              게시판 페이지네이션·검색
│       └── travelproducts/      숙박권 분류·검색과 기존 상세
├── graphql/
│   ├── practice-boards.graphql  게시판 Query
│   └── practice-travelproducts.graphql
├── gql/                         Codegen 자동 생성 폴더
└── lib/
    └── ApolloSetting.tsx        Apollo 앱 전체 설정
```

- 처음부터 모든 파일을 나누지 않습니다.
- 같은 UI 또는 동작이 두 번 이상 나타났을 때 분리합니다.
- 자동 생성 파일은 읽어볼 수 있지만 직접 수정하지 않습니다.
- 날짜가 아니라 `boards`, `travelproducts`처럼 기능 이름으로 나눕니다.
- Query를 수정한 뒤 `npm run codegen`으로 `gql` 폴더를 다시 만듭니다.
