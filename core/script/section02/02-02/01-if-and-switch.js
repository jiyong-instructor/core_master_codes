// if 문 실습
if (1+1 === 2) { // 만약 1+1이 2와 같다면
    console.log('정답입니다!'); // 정답입니다! 출력
}

if (1+1 === 2) { // 만약 1+1이 3과 같다면
    console.log('정답입니다!'); // 정답입니다! 출력
} else { // 그렇지 않다면
    console.log('틀렸습니다!'); // 틀렸습니다! 출력
}

// 삼항연산자
const 공부점수 = 50
const 결과 = 공부점수 >= 60 ? '합격' : '불합격'; // 공부점수가 60 이상이면 합격, 아니면 불합격


// Switch 문
switch (공부점수) { // 공부점수에 따라
    case 100: // 공부점수가 100이면
        console.log('A+'); // A+ 출력
        break; // switch문 종료
    case 90: // 공부점수가 90이면
        console.log('A'); // A 출력
        break;
    default: // 위의 case에 해당하지 않으면
        console.log('F'); // F 출력
}