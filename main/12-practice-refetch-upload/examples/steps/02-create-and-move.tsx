"use client";

import { gql, useMutation } from @apollo/client/react;
import { useRouter } from "next/navigation";

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
    const router = useRouter();

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

        const newId = result.data.createTravelproduct._id;

        // 새로 만들어진 상품의 ID 콘솔로 확인
        console.log(newId);

        // 등록이 끝나면 새 상품의 상세 페이지로 이동시키기.
        router.push(`/travelproducs/${newId}`);
    }

    return <button onClick={handleCreate}>등록하고 이동</button>
}