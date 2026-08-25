import styled from "styled-components";

function App() {
  return (
    // 리턴 함수 안에서 무조건 단 하나의 엘리먼트만 존재해야 합니다. 최상위에서 단 하나의 엘리먼트만 반환 해줘야 합니다. 왜냐면 이것은 함수 이기 때문이죠.
    <>
      <div>
        <Title color="red">Hello React</Title>
        <Banner>Banner</Banner>
        <Button bgColor="blue">버튼</Button>
      </div>
    </>
  );
}

export default App;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.color};
`;

const Banner = styled.div`
  background-color: black;
  width: 300px;
  height: 300px;
`;

const Button = styled.button`
  background-color: ${(props) => props.bgColor};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
