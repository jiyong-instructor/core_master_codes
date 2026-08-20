import { useState, useEffect } from 'react';

export default function EffectTitleExample() {

    const [city, setCity] = useState('서울');
    const [people, setPeople] = useState(1);

    // 리액트에서 useEffect Hook을 사용하면, 리액트가 렌더링 될 때마다 특정 작업을 수행 시킬 수 있어요.
    // useEffect는 브라우저 탭의 제목을 바꾸거나, 서버에서 데이터를 가져오거나, 구독을 설정하거나, 수동으로 React 컴포넌트의 DOM을 변경하는 등의 작업을 수행할 때 사용됩니다.
    useEffect(() => {

        // 이곳은 어떤 작업을 수행할지 작성하는 곳이에요. 이곳에 작성한 코드는 컴포넌트가 렌더링 될 때마다 실행됩니다.
        document.title = `${city} 여행 ${people}명`;

        return () => {
            // 이곳은 어떤 작업을 수행한 후, 정리(cleanup)할 작업을 작성하는 곳이에요. 이곳에 작성한 코드는 컴포넌트가 사라질 때 실행됩니다.
            document.title = '트립토크 여행';
        }

    }, [city, people]); // 이 배열은 의존성 배열이라 하고, 이 작업이 언제 실행되고 끝나는지 정의하는 영역이에요.

    function decreaseCount () {
        if ( people > 1 ) {
            setPeople(people - 1)
        }
    }
    function increaseCount () {
        setPeople(people + 1);
    }

    return(<>
        <main>
            <h1>페이지 제목 바꾸기</h1>
            <p>도시나 인원이 바뀔 때 브라우저 탭의 제목도 확인해보세요.</p>

            <label htmlFor="city">도시</label>
            <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                <option>서울</option>
                <option>부산</option>
                <option>대구</option>
                <option>인천</option>
            </select>

            <section>
                <button onClick={decreaseCount}>-1</button>
                <button onClick={increaseCount}>+1</button>
            </section>

            <p>현재 예약: {city} 여행 {people}명</p>
        </main>
    </>)

}