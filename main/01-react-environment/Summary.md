# day01 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 20일 메인코스의 첫날이었습니다. React, Vue, Angular가 왜 등장했는지 살펴보고, React의 가장 작은 컴포넌트를 직접 실행해봤어요. 마지막에는 앞으로 매일 사용할 Node.js, npm, nvm의 역할도 확인했습니다.

오늘 흐름은 이렇게 기억하면 좋아요.  
**화면이 커질 때의 문제 찾기 → 컴포넌트 방식 이해하기 → JSX로 화면 만들기 → React 화면 실행하기 → Node 개발 환경 확인하기**

## 1. React는 왜 사용할까요?

HTML, CSS, JavaScript만으로도 웹사이트를 만들 수 있습니다. 하지만 화면이 커지고 같은 모양과 기능이 반복되면 파일 안에서 원하는 부분을 찾고 수정하기 어려워져요.

React는 화면을 작은 컴포넌트로 나누고 다시 조립하도록 도와줍니다.

```text
TripTalk 메인 화면
├── Header
├── SearchBox
├── TravelCard
└── Footer
```

컴포넌트는 모양만 나누는 파일이 아니라 화면의 데이터와 동작까지 함께 관리할 수 있는 작은 단위입니다.

## 2. React, Vue, Angular의 공통점과 차이

세 도구 모두 복잡한 화면을 컴포넌트 단위로 만들 수 있게 도와줘요.

| 도구 | 간단한 특징 |
|---|---|
| React | UI를 만들기 위한 라이브러리이며 필요한 도구를 조합해 사용해요. |
| Vue | HTML과 비슷한 template 문법으로 시작하기 쉬워요. |
| Angular | 라우팅과 폼 등 큰 애플리케이션에 필요한 기능을 넓게 제공해요. |

어떤 도구가 무조건 더 좋다기보다 회사의 기존 코드, 팀 경험, 프로젝트 규모에 따라 선택합니다. 이번 과정에서는 React와 React 기반 Next.js를 사용해요.

## 3. JSX로 화면 만들기

`steps/01-jsx.jsx`에서는 JavaScript 안에 HTML과 비슷한 코드를 작성했습니다.

```jsx
const courseName = "Main Course"

return <h1>{courseName}</h1>
```

- JSX는 HTML과 닮았지만 JavaScript 문법입니다.
- JavaScript 값을 보여줄 때 `{}`를 사용해요.
- 여러 태그를 반환할 때는 하나의 부모 태그나 Fragment로 감싸요.
- `class` 대신 `className`을 사용해요.

처음에는 “가짜 HTML”이라고 생각해도 괜찮지만, 실제로는 빌드 도구가 JavaScript 코드로 변환해준다는 점을 기억해주세요.

## 4. 컴포넌트 만들어 조립하기

`steps/02-component.jsx`에서는 `Logo`, `WelcomeText`를 만들어 부모 컴포넌트 안에서 조립했습니다.

```jsx
function Logo() {
  return <strong>TripTalk</strong>
}

function Header() {
  return <Logo />
}
```

- 컴포넌트 이름은 대문자로 시작해요.
- 화면에서는 `<Logo />`처럼 태그 모양으로 사용해요.
- 한 컴포넌트에는 이해하기 쉬운 하나의 역할을 주는 것이 좋아요.

## 5. JSX 안에서 계산과 조건 사용하기

`steps/03-expression.jsx`에서는 가격을 계산하고 예약 가능 여부를 보여줬습니다.

```jsx
<p>{price * count}원</p>
<p>{isSoldOut ? "예약 마감" : "예약 가능"}</p>
```

중괄호 안에는 결과가 값이 되는 JavaScript 표현식을 넣을 수 있어요. 긴 `if`문이나 여러 줄의 작업은 JSX 밖에서 먼저 계산하는 편이 읽기 쉽습니다.

## 6. 배열을 화면에 반복해서 보여주기

`steps/04-list.jsx`에서는 도시 배열을 `map()`으로 반복했습니다.

```jsx
{cities.map((city) => (
  <li key={city}>{city}</li>
))}
```

지금은 “배열의 개수만큼 태그가 만들어진다” 정도로 이해하면 충분해요. `key`는 React가 각 항목을 구분할 수 있게 붙이는 이름표입니다.

## 7. 사용자의 클릭에 함수 연결하기

`steps/05-event.jsx`에서는 버튼을 클릭했을 때 함수를 실행했습니다.

```jsx
function showMessage() {
  alert("반갑습니다!")
}

<button onClick={showMessage}>인사 보기</button>
```

`onClick={showMessage()}`라고 쓰면 화면을 그리는 중에 바로 실행돼요. 클릭할 때 실행하려면 함수 이름을 전달해야 합니다.

## 8. Node.js, npm, nvm

React 프로젝트는 브라우저에서 실행되지만 개발 중에는 파일 변환, 패키지 설치, 개발 서버 실행 같은 작업이 필요합니다. 이 작업을 위해 Node.js를 사용해요.

- Node.js: 브라우저 밖에서 JavaScript를 실행하는 환경
- npm: 패키지를 설치하고 프로젝트 명령을 실행하는 도구
- nvm: 여러 Node 버전을 설치하고 선택하는 도구

```bash
node --version
npm --version
nvm --version
```

`steps/06-node-example.js`는 다음처럼 실행할 수 있습니다.

```bash
node 06-node-example.js
```

## 9. 오늘 자주 만난 오류

- 컴포넌트 이름을 소문자로 시작하면 일반 HTML 태그로 생각할 수 있어요.
- JSX에서 여러 형제 태그를 그대로 반환하면 오류가 나요.
- 문자열을 JSX에 보여줄 때 따옴표와 중괄호 위치가 헷갈릴 수 있어요.
- `npm`과 `nvm`은 같은 도구가 아니에요.
- Node 설치 후 터미널을 다시 열어야 명령어가 인식되는 경우가 있어요.

## 오늘의 핵심

1. React는 화면을 컴포넌트로 나누고 조립하도록 도와줘요.
2. JSX 안에서 JavaScript 값은 중괄호로 보여줘요.
3. 컴포넌트 이름은 대문자로 시작해요.
4. 배열은 `map()`으로 반복해서 화면에 그릴 수 있어요.
5. event에는 실행할 함수를 연결해요.
6. Node.js는 개발 도구와 프로젝트 명령을 실행하는 데 사용해요.
7. npm은 패키지, nvm은 Node 버전을 관리해요.

## 한번 해보기

- `courseName`을 원하는 과정 이름으로 바꿔보세요.
- `Logo`, `WelcomeText` 외에 `LoginButton` 컴포넌트를 추가해보세요.
- 도시 배열에 두 도시를 더 넣어보세요.
- 예약 마감 값을 `true`로 바꿔 화면을 비교해보세요.
- Node 예제의 학생 수를 바꾸고 터미널에서 다시 실행해보세요.

첫날에는 모든 문법을 외우는 것이 목표가 아니에요. “작은 컴포넌트를 만들고, JSX로 조립한 화면을 Node 기반 개발 환경에서 실행한다”는 큰 흐름만 잡으면 충분합니다 ㅎㅎ
