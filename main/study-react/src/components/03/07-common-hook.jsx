import { memo, useCallback, useMemo, useRef, useState } from "react";

const trips = [
    { id: 1, city: "제주", title: "제주 바다 산책", price: 32000 },
    { id: 2, city: "부산", title: "부산 야경 여행", price: 28000 },
    { id: 3, city: "강릉", title: "강릉 카페 투어", price: 25000 },
    { id: 4, city: "서울", title: "서울 궁궐 여행", price: 20000 },
]

// memo는 전달받은 props가 같으면 자식 컴포넌트를 다시 그리지 않도록 도와주는 리액트 기본 함수에요.
// 화면이 느려졌을 때 확인하고 사용하는 최적화 도구이므로 모든 컴포넌트에 쓰이지는 않는 친구죠.
const TripCard = memo(function TripCard({ trip, onSelect}) {
    // 지금 개발 모드에서 킬때는 StrictMode가 켜져있어서, console.log가 두 번 찍히는 것처럼 보이지만, 실제 배포 환경에서는 한 번만 찍혀요.
    console.log(`${trip.title} 카드가 렌더링 되었어요.`)

    return (
        <li>
        <strong>{trip.city}</strong>
        <h3>{trip.title}</h3>
        <p>{trip.price.toLocaleString()}원부터</p>
        <button onClick={() => onSelect(trip.title)}>이 여행 선택</button>
        </li>
    )
})

export default function CommonHookExample() {
    const [keyword, setKeyword] = useState("");
    const [selectedTrip, setSelectedTrip] = useState("");
    const [visitCount, setVisitCount] = useState(0);

    // useRef는 특정 HTML 요소를 직접 가리킬 때 사용해요.
    // 홈페이지에서는 검색창에 커서를 보내거나 특정 위치로 이동할 때 자주 사용해요.
    const searchInputRef = useRef(null);


    // useMemo는 계산한 결과를 기억해요.
    // keyword가 바뀔 때만 여행 목록을 다시 필터링합니다.
    // 상품이 수천 개처럼 많아서 계산이 무거울 때 도움이 될 수 있어요.
    const filteredTrips = useMemo(() => {
        console.log("검색 결과를 다시 계산해요.");

        return trips.filter((trip) => {
            return trip.title.includes(keyword);
        });
    }, [keyword]);


    // useCallback은 함수를 기억해요.
    // memo로 감싼 자식에게 함수를 props로 전달할 때 함께 사용하는 경우가 많아요.
    const handleTripSelect = useCallback((tripTitle) => {
        setSelectedTrip(tripTitle);
    }, []);


    function handleKeywordChange(event) {
    setKeyword(event.target.value);
    }

    function focusSearchInput() {
    // ref의 current에는 ref를 연결한 실제 input 요소가 들어 있어요.
    searchInputRef.current.focus();
    }

    function clearKeyword() {
    setKeyword("");
    searchInputRef.current.focus();
    }

    function increaseVisitCount() {
    // 이 값이 바뀌면 부모는 다시 그려지지만 검색 결과는 다시 계산하지 않아요.
    // 개발자 도구의 Console을 열고 메시지를 비교해보세요.
    setVisitCount(visitCount + 1);
    }

    return (

        <main>
        <header>
            <h1>TripTalk Hook 연습</h1>
            <p>useRef, useMemo, useCallback을 한 화면에서 확인해요.</p>
        </header>

        <section>
            <h2>여행 검색</h2>

            <label htmlFor="keyword">여행지 또는 여행 이름</label>
            <input
            id="keyword"
            ref={searchInputRef}
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="제주, 부산, 강릉"
            />

            <button onClick={focusSearchInput}>검색창에 커서 보내기</button>
            <button onClick={clearKeyword} disabled={keyword === ""}>
            검색어 지우기
            </button>
        </section>

        <section>
            <h2>방문 횟수</h2>
            <p>이 페이지를 확인한 횟수: {visitCount}회</p>
            <button onClick={increaseVisitCount}>방문 횟수 증가</button>
            <p>이 버튼을 눌러도 검색어가 같다면 필터 계산 결과를 다시 만들지 않아요.</p>
        </section>

        <section>
            <h2>검색 결과</h2>
            <p>{filteredTrips.length}개의 여행을 찾았어요.</p>

            {filteredTrips.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
            ) : (
            <ul>
                {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} onSelect={handleTripSelect} />
                ))}
            </ul>
            )}
        </section>

        <section>
            <h2>선택한 여행</h2>
            <p>{selectedTrip || "아직 선택한 여행이 없어요."}</p>
        </section>
        </main>
    )


}