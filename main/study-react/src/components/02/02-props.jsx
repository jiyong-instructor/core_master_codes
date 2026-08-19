function Greeting ({ name, city }) {
    // 부모가 전달한 name과 city를 props로 받아서 화면에 출력해주는 컴포넌트
    return (
        <p>
            {name}님, 이번 주말에는 {city}에 다녀오시는 건 어떠세요?
        </p>
    )
}

function TripCard ({title, city, nights, price, isPopular}) {
    return (
        <article>
            {isPopular && <strong>현재 인기 여행지</strong>}
            <p>{city}</p>
            <h2>{title}</h2>
            <p>{nights}박 일정</p>
            <p>{price.toLocaleString()}원</p>
            <button>{city} 여행 보기</button>
        </article>
    )
}

export default function RecommendTripCards () {
    return (
        <main>
            <h1>이번 주말 추천 여행지</h1>

            <section>
                <Greeting name="민지" city="뉴욕" />
                <Greeting name="철수" city="도쿄" />
            </section>

            <section>
                {/* 같은 컴포넌트를 props에 따라 서로 다른 내용을 보여주며 재사용이 가능해요 */}
                <TripCard 
                    title="뉴욕 여행"
                    city="뉴욕"
                    nights={3}
                    price={1200000}
                    isPopular={true}
                />
                <TripCard 
                    title="도쿄 여행"
                    city="도쿄"
                    nights={2}
                    price={900000}
                    isPopular={false}
                />
                <TripCard
                    title="파리 여행"
                    city="파리"
                    nights={4}
                    price={1500000}
                    isPopular={true}
                />
            </section>
        </main>
    )
}