import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://main-practice.codebootcamp.co.kr/graphql",
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "src/gql/": {
      preset: "client",
      config: {
        // 서버의 DateTime을 화면에서는 문자열로 사용해요.
        scalars: { DateTime: "string", Upload: "File" },
      },
    },
  },
};

// 생성된 generated.ts는 직접 수정하지 않습니다.
export default config;
