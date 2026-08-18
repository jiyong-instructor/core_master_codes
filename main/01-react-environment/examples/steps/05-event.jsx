"use client"; // React 18부터는 use client를 붙여야 클라이언트 컴포넌트로 인식합니다. 앞으로 넥스트(서버컴포넌트) 배울때 더 알아볼거에요.

export default function EventExample() { // 함수기 때문에 함수안에 또 함수를 만들 수 있겠죠?

    function showMessage() {
        alert("버튼이 클릭되었습니다.");
    }

    return (
        <button
            onClick={showMessage}
        >메세지보기
        </button>
    )

}