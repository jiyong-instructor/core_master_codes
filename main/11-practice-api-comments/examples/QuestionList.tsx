"use client";

import { gql, useQuery } from "@apollo/client";

const FETCH_QUESTIONS = gql`
  query FetchQuestions($travelproductId: ID!) {
    fetchTravelproductQuestions(travelproductId: $travelproductId) {
      _id
      contents
      user {
        name
      }
    }
  }
`;

export default function QuestionList({ productId }: { productId: string }) {
  const { data } = useQuery(FETCH_QUESTIONS, {
    // 현재 여행상품의 ID로 그 상품에 달린 문의만 조회해요.
    variables: { travelproductId: productId },
  });

  return (
    <ul>
      {data?.fetchTravelproductQuestions.map(
        (question: {
          _id: string;
          contents: string;
          user: { name: string };
        }) => (
          <li key={question._id}>
            {question.user.name}: {question.contents}
          </li>
        ),
      )}
    </ul>
  );
}
