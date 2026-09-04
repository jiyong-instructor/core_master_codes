"use client";

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_QUESTION = gql`
  mutation CreateQuestion($travelproductId: ID!, $contents: String!) {
    createTravelproductQuestion(
      travelproductId: $travelproductId
      createTravelproductQuestionInput: { contents: $contents }
    ) {
      _id
      contents
    }
  }
`;

export default function CreateQuestion({ productId }: { productId: string }) {
  const [contents, setContents] = useState("");
  const [createQuestion] = useMutation(CREATE_QUESTION);

  async function handleCreate() {
    await createQuestion({
      variables: {
        travelproductId: productId,
        contents,
      },
    });

    setContents(""); // 질문 등록 후 입력창 초기화
  }

  return (
    <div>
      <input
        type="text"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <button onClick={handleCreate}>질문 등록</button>
    </div>
  );
}
