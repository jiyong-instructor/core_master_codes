"use client";

import { gql, useMutation } from @apollo/client/react;

const CREATE_TRAVEL = gql`
  mutation CreateTravel($input: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $input) {
      _id
      name
    }
  }
`;

export default function Createmutation() {
    const [createMutation] = useMutation(CREATE_TRAVEL);

    async function handleCreate() {
        const result = await CREATE_TRAVEL({
            variables: {
                input: {
                name: "제주 바다 여행",
                price: 100000,
                remarks: "바다를 보러 가요.",
                contents: "제주 여행 상세 내용입니다.",
                },
            },
        });

        // 새로 만들어진 상품의 ID 콘솔로 확인
        console.log(result.data.createTravelproduct._id);
    }

    return <button onClick={handleCreate}>여행 등록</button>
}