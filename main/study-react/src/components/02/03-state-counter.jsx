import { useState } from 'react';

export default function StateCounter() {

    // count는 변수명이되고, setCount는 count를 변경할 수 있는 함수가 된다. useState(1)에서 1은 count의 초기값이 된다.
    // useState를 사용해 생성한 변수에 값이 바뀌면 컴포넌트가 다시 렌더링 됩니다.
    const [count, setCount] = useState(1);

    function increaseCount() {
        if (count < 10) {
            setCount(count + 1);
        }
    }

    function decreaseCount() {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    function resetCount() {
        setCount(1);
    }

    const totalPrice = count * 32000;

    return(
        <main>
            <h1>👉🏻 여행 인원 선택</h1>
            <p>제주 바다 산책에 참여할 인원을 골라주세요</p>

            <section>
                <p>현재 인원</p>
                <strong>{count}명</strong>

                <div>
                    <button onClick={decreaseCount} disabled={count === 1}>
                        -1
                    </button>
                    <button onClick={increaseCount} disabled={count === 10}>
                        +1
                    </button>
                    <button onClick={resetCount}>처음으로</button>
                </div>
            </section>

            <section>
                <h2>예약금액</h2>
                <p>1인 요금: 32,000원</p>
                <p>총 금액: {totalPrice.toLocaleString()}원</p>
                {
                    count === 10 && <strong>한 번에 최대 10명까지 만 예약할 수 있어요 👨🏻‍🚀</strong>
                }
            </section>

        </main>
    )
}