// 문자열, 숫자, 불린처럼 값 하나의 기본 타입부터 시작합니다.
let courseName: string = "Main Course";

// : number를 붙이면 숫자만 저장 할 수 있습니다.
let studentCount: number = 12;

// boolean 타입은 true, false만 저장 할 수 있습니다.
let isStarted: boolean = false;

// | 유니언 타입 혹은 | 기호는 "또는" 이라고 읽어요. 문자열 또는 Null이 들어갈 수 있어요.
let classroomName: string | null = null;

// 아직 값이 정해지지 않은 상태를 나타내기 위해 undefined를 사용할 수 있어요. undefined는 값이 없음을 의미합니다.
let teacherMessage: string | undefined = undefined;

// 타입스크립의 마법의 타입 any는 어떤 값이든 저장할 수 있어요. 하지만 타입스크립트의 장점을 살리기 위해서 any는 가급적 사용하지 않는 것이 좋아요.
let anyValue: any = "Hello";
anyValue = [42];

// 우리가 처음 정한 타입과 같은 타입의 값으로 바꾸는 것은 가능해요 하지만 다른 값을 넣을 수는 없습니다.
courseName = "AI Course"; // 가능
// courseName = 123; // 불가능, 타입이 맞지 않아요.
isStarted = true; // 가능
classroomName = "Room 101"; // 가능
teacherMessage = "Welcome!"; // 가능

// 타입스크립트 타입은 개발 중 실수를 검사하고, 실행 될 JavaScript 코드에 영향을 주지 않아요. 
// 타입스크립트는 개발 중에만 존재하고, 빌드 후에는 자바스크립트로 변환되어 실행됩니다.