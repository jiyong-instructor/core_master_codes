"use client";

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_ANSWER = gql`
  mutation CreateAnswer($questionId: ID!, $contents: String!) {
    createTravelproductQuestionAnswer(
      travelproductQuestionId: $questionId
      createTravelproductQuestionAnswerInput: { contents: $contents }
    ) {
      _id
      contents
    }
  }
`;

type CreateAnswerProps = {
  questionId: string;
};

export default function CreateAnswer({ questionId }: CreateAnswerProps) {
  const [contents, setContents] = useState("");
  const [createAnswer] = useMutation(CREATE_ANSWER);

  const onClickCreate = async () => {
    await createAnswer({
      variables: {
        questionId,
        contents,
      },
    });

    // 등록이 끝나면 입력창을 초기화
    setContents("");
  };

  return (
    <div>
      <input
        type="text"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <button onClick={onClickCreate}>답변 등록</button>
    </div>
  );
}
