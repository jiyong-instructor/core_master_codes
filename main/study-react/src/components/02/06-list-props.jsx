import { useState } from 'react';

function CityCard({name, description, bestSeason, price}) {

    return (
        <article>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>추천 계절: {bestSeason}</p>
            <p>가격: {price.toLocaleString()}원</p>
            <button>{name} 자세히 보기</button>
        </article>
    );
}

const cities = [
{
    id: 1,
    name: "제주",
    description: "바다와 오름이 있는 여행지",
    bestSeason: "봄",
    price: 32000,
  },
  {
    id: 2,
    name: "부산",
    description: "해변과 시장이 있는 여행지",
    bestSeason: "여름",
    price: 28000,
  },
  {
    id: 3,
    name: "강릉",
    description: "바다와 카페가 있는 여행지",
    bestSeason: "가을",
    price: 25000,
  },
  {
    id: 4,
    name: "서울",
    description: "궁궐과 야경을 함께 보는 여행지",
    bestSeason: "겨울",
    price: 20000,
  },
];

export default function ListPropsExample() {

    const [showAll, setShowAll] = useState(false);
    const visibleCities = showAll ? cities : cities.slice(0, 2);

    function toggleCityList() {
        setShowAll((prev) => !prev);
    }

    return (
        <main>
            <h1>추천 여행지</h1>
            <p>현재 {visibleCities.length}개의 여행지를 보여주고 있어요.</p>

            <section>
                {/* 반복문을 통해서 리턴하는 엘리먼트 1개 이기에 소괄호 사용해서 리턴해주도록 해요. 
                그리고 map 함수를 이용해 배열 데이터의 값을 props로 전달해서 같은 카드를 반복해서 만들어요. */}
                {visibleCities.map((city)=>(
                    <CityCard 
                        key={city.id}
                        name={city.name}
                        description={city.description}
                        bestSeason={city.bestSeason}
                        price={city.price}
                    />
                ))}
            </section>

            <button onClick={toggleCityList}>
                {showAll ? '두 개만 보기' : '여행지 모두 보기'}
            </button>
        </main>
    )
}