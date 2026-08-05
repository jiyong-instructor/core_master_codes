// 객체를 만들어보자

const 과일담는통 = {
    사과: 5,
    바나나: 10,
    딸기: 10
}

localStorage.setItem('내과일들', 과일담는통)

// JSON.stringify()를 이용해서 객체를 문자열로 바꿔서 저장해야 한다.
JSON.stringify(과일담는통)

// 다시 로컬스토리지에 저장해준다
localStorage.setItem('내과일들', JSON.stringify(과일담는통))

// 다시 이전 객체로 돌리고 싶다면
JSON.parse(localStorage.getItem('내과일들')) // => {사과: 5, 바나나: 10, 딸기: 10} 라는 객체를 꺼내올수 있습니다.