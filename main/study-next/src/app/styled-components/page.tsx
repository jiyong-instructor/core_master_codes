"use client";

import { useState } from "react";
import styled from "styled-components";

const Page = styled.main`
  min-height: 100vh;
  padding: 64px 24px;
  background: #f7f8fc;
`;

const Card = styled.article<{ $selected: boolean }>`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: 32px;
  border: 2px solid ${(props) => (props.$selected ? "#2563eb" : "#e5e7eb")};
  border-radius: 18px;
  background: white;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 13px;
  border: 0;
  border-radius: 8px;
  color: white;
  background: #2563eb;
  font-weight: 700;
  cursor: pointer;
`;

export default function StyledComponentsPage() {
  const [selected, setSelected] = useState(false);

  return (
    <Page>
      <Card $selected={selected}>
        <p>Styled Components Card</p>
        <h1>JavaScript 파일 안에서 스타일 만들기</h1>
        <p>
          styled-components를 사용하면, CSS 파일을 따로 만들지 않고도 JS/TSX
          파일 안에서 스타일이 적용된 컴포넌트를 만들 수 있어요. 버튼을 누르면
          state 값에 따라 테두리 색이 바뀌어요. 이 페이지는 클릭을 사용하므로
          클라이언트 컴포넌트입니다.
        </p>
        <Button onClick={() => setSelected(!selected)}>
          {selected ? "선택 해제" : "카드 선택"}
        </Button>
      </Card>
    </Page>
  );
}
