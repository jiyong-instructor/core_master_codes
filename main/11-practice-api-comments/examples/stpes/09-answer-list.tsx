"use client";

import { gql, useQuery } from "@apollo/client";

const FETCH_ANSWERS = gql`
  query FetchAnswers($questionId: ID!) {
    fetchTravelproductQuestionAnswers(travelproductQuestionId: $questionId) {
      _id
      contents
      user {
        name
      }
    }
  }
`;

type AnswerListProps = {
  questionId: string;
};

export default function AnswerList({ questionId }: AnswerListProps) {
  const { data } = useQuery(FETCH_ANSWERS, {
    // 부모 댓글 ID를 보내면 그 댓글 아래의 대댓글만 받아와요.
    variables: { questionId },
  });

  return (
    <ul>
      {data?.fetchTravelproductQuestionAnswers.map(
        (answer: { _id: string; contents: string; user: { name: string } }) => (
          <li key={answer._id}>
            {answer.user.name}: {answer.contents}
          </li>
        ),
      )}
    </ul>
  );
}
