const cities = ['서울' , '도쿄' , '베이징' , '뉴욕' , '런던' , '파리' , '시드니' , '로스앤젤레스' , '샌프란시스코' , '방콕'];

export default function CityList () {

    return (
        <ul>
            {   // 배열의 map 함수를 사용해서 배열 안에 있는 요소들을 반복적으로 렌더링 할 수 있어요.
                cities.map((city, index) => <li key={index}>{city}</li>)
            }
        </ul>
    )

}