import {useState} from 'react';

function TripCard({title, location, price}) {

    const [likeCount, setLikeCount] = useState(0);

    function increaseLikeCount() {
        setLikeCount(likeCount + 1);
    }

    function resetLikeCount() {
        setLikeCount(0);
    }

    return (
        <article>
            <p>{location}</p>
            <h2>{title}</h2>
            <p>{price.toLocaleString()}원 부터</p>
            <p>좋아요 {likeCount}개</p>

            <button onClick={increaseLikeCount}>좋아요</button>
            <button onClick={resetLikeCount} disabled={likeCount === 0}>초기화</button>
        </article>
    )
}

export default function ComponentExample() {
    const trips = [
        { id: 1, title: '제주도 여행', location: '제주', price: 300000},
        { id: 2, title: '서울 여행', location: '서울', price: 200000},
        { id: 3, title: '부산 여행', location: '부산', price: 250000},
    ];

    return (
        <main>
            <header>
                <h1>여행 상품</h1>
                <p>오늘 우리가 배웠던 props, state를 한 화면에서 복습해볼게요</p>
            </header>

            <section>
                {
                    trips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            title={trip.title}
                            location={trip.location}
                            price={trip.price}
                        />
                    ))
                }
            </section>
        </main>
    );
}