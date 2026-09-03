import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // 과제용 API 스키마와 우리가 작성한 Graphql 문서를 비교합니다.
  schema: "https://main-practice.codebootcamp.co.kr/graphql",
  documents: ["src/graphql/**/*graphql"],
  generates: {
    // 이 폴더는 npm run codegen 명령어로 자동 생성돼요.
    "src/gql/": {
      preset: "client",
      config: {
        // API의 사용자 정의 타입을 브라우저에서 사용할 타입으로 알려줘요.
        scalars: {
          DateTime: "string",
          Upload: "File",
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
