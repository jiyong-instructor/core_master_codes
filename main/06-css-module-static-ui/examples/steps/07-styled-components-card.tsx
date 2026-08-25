"use client";

import { useState } from "react";
import styled from "styled-components";

// styled-components는 TSX 파일 안에서 스타일이 적용된 컴포넌트를 만들어요.
const Card = styled.article<{ $selected: boolean }>`
  width: 320px;
  padding: 20px;
  border: 2px solid ${(props) => (props.$selected ? "#2563eb" : "#dddddd")};
  border-radius: 16px;
  background: white;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border: 0;
  border-radius: 8px;
  color: white;
  background: #2563eb;
`;

export default function StyledComponentsCard() {
  const [selected, setSelected] = useState(false);

  return (
    <Card $selected={selected}>
      <p>주말 추천</p>
      <h2>제주 바다 여행</h2>
      <p>버튼을 누르면 카드의 테두리 색이 바뀌어요.</p>

      <Button onClick={() => setSelected(!selected)}>
        {selected ? "선택 해제" : "여행 선택"}
      </Button>
    </Card>
  );
}
