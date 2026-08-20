import CommonHookExample from './components/03/07-common-hook';


function App() {

  return ( // 리턴 함수 안에서 무조건 단 하나의 엘리먼트만 존재해야 합니다. 최상위에서 단 하나의 엘리먼트만 반환 해줘야 합니다. 왜냐면 이것은 함수 이기 때문이죠.
    <>
      <CommonHookExample />
    </>
  )
}

export default App