# day02 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 React 화면을 여러 컴포넌트로 나누고, 부모가 자식에게 props를 전달하고, `useState`로 화면의 값을 바꿔봤습니다. 입력창과 조건부 화면, 배열 카드까지 연결하면서 React 화면이 다시 그려지는 이유도 확인했어요.

오늘 흐름은 이렇게 기억하면 좋아요.  
**컴포넌트 나누기 → props 전달하기 → state 만들기 → event로 state 바꾸기 → 조건과 배열을 화면에 표시하기**

## 1. 화면을 컴포넌트로 나누기

`steps/01-basic-component.jsx`에서는 한 화면을 Header, WelcomeMessage, RecommendTrip, TodaySchedule, Footer로 나눴습니다.

```jsx
function Header() {
  return <header>TripTalk</header>
}

function App() {
  return <Header />
}
```

처음부터 버튼과 글자 하나까지 모두 파일로 나눌 필요는 없어요. 다음 기준으로 시작하면 편합니다.

- 여러 페이지에서 반복되는 영역
- 하나의 역할을 설명할 수 있는 영역
- 코드가 길어져 따로 읽는 편이 쉬운 영역

## 2. props는 부모가 전달하는 값

`steps/02-props.jsx`에서는 같은 `Greeting`, `TripCard` 컴포넌트에 서로 다른 여행 정보를 전달했습니다.

```jsx
<Greeting name="민지" city="제주" />
<Greeting name="철수" city="부산" />
```

자식에서는 props를 다음처럼 받아요.

```jsx
function Greeting({ name, city }: GreetingProps) {
  return <p>{name}님, {city} 여행은 어떠세요?</p>
}
```

- props는 위에서 아래로 전달돼요.
- 자식은 전달받은 props를 직접 바꾸지 않아요.
- 타입은 “어떤 이름의 값을 어떤 타입으로 받을지” 알려줘요.

## 3. 일반 변수와 state의 차이

일반 변수는 값을 바꿀 수 있지만 React가 그 변화를 자동으로 화면에 다시 표시하지 않습니다. 화면과 함께 바뀌어야 하는 값은 state로 만들어요.

```jsx
const [count, setCount] = useState(0)
```

- `count`: 지금 화면에 사용할 값
- `setCount`: 값을 변경하고 다시 렌더링하도록 알려주는 함수
- `0`: 첫 화면의 초기값

`steps/03-state-counter.jsx`에서는 증가, 감소, 초기화 버튼을 각각 함수에 연결했습니다.

```jsx
function increaseCount() {
  setCount(count + 1)
}
```

state를 직접 `count = count + 1`처럼 바꾸면 안 돼요. 변경 함수를 사용해야 React가 새 화면을 준비합니다.

## 4. event에서 입력값 읽기

`steps/04-input-state.jsx`에서는 input과 textarea의 값이 바뀔 때 실행되는 `onChange`를 사용했습니다.

```jsx
function handleKeywordChange(event) {
  setKeyword(event.target.value)
}
```

- `event`: 사용자의 행동 정보
- `event.target`: 값이 바뀐 input
- `event.target.value`: 현재 input에 들어 있는 문자열

input의 `value`에도 같은 state를 연결하면 화면의 input과 React의 값이 같은 상태를 유지합니다.

## 5. 이전 state를 기준으로 바꾸기

이전 값을 반대로 바꾸거나 이전 배열 뒤에 새 값을 추가할 때는 함수 형태의 변경을 사용할 수 있어요.

```jsx
setIsLoggedIn((previousValue) => !previousValue)
```

`previousValue`에는 변경 직전의 값이 들어옵니다. 여러 변경이 빠르게 실행될 수 있는 코드에서는 이전 state를 안전하게 사용할 수 있어요.

## 6. 조건부 렌더링

`steps/05-conditional-render.jsx`에서는 로그인 여부에 따라 서로 다른 컴포넌트와 버튼 글자를 보여줬습니다.

```jsx
<p>{isLoggedIn ? "반갑습니다." : "로그인이 필요합니다."}</p>
```

조건부 렌더링 방법은 여러 가지예요.

```jsx
{isLoggedIn && <MyPageButton />}
{errorMessage ? <ErrorMessage /> : <SuccessMessage />}
```

- `&&`: 조건이 참일 때만 보여주기
- 삼항 연산자: 참과 거짓에 서로 다른 화면 보여주기

## 7. 배열 데이터와 props 함께 사용하기

`steps/06-list-props.jsx`에서는 도시 배열을 반복하고 각 값을 카드의 props로 전달했습니다.

```jsx
{cities.map((city) => (
  <CityCard key={city.id} {...city} />
))}
```

`{...city}`는 객체 안의 `name`, `description`을 같은 이름의 props로 펼쳐 전달합니다. 처음에는 다음처럼 하나씩 적어도 괜찮아요.

```jsx
<CityCard name={city.name} description={city.description} />
```

명시적으로 적는 방식이 더 이해하기 쉽다면 먼저 그 방식으로 작성한 뒤 펼치기 문법으로 바꿔보세요.

## 8. 렌더링을 이렇게 생각해요

```text
버튼 클릭
→ event 함수 실행
→ setState 실행
→ React가 컴포넌트 함수 다시 실행
→ 새로운 JSX 계산
→ 바뀐 부분을 화면에 반영
```

state가 바뀔 때 HTML 전체를 새로 받는 것은 아니에요. React가 이전 결과와 새 결과를 비교해 필요한 부분을 반영합니다.

## 9. 오늘 자주 만난 오류

- props 이름과 자식에서 받는 이름이 다르면 값이 `undefined`가 돼요.
- `onClick={increaseCount()}`는 클릭 전부터 함수를 실행해요.
- state를 직접 대입하면 화면이 바뀌지 않을 수 있어요.
- `map()`으로 만든 항목에는 고유한 `key`가 필요해요.
- 부모의 state가 필요 이상으로 많으면 모든 자식이 복잡해질 수 있어요.

## 오늘의 핵심

1. 컴포넌트는 화면의 역할을 나누는 단위예요.
2. props는 부모가 자식에게 전달하고 자식이 직접 바꾸지 않아요.
3. state는 바뀌었을 때 화면도 함께 바뀌어야 하는 값이에요.
4. event 함수에서 state 변경 함수를 실행할 수 있어요.
5. 이전 값을 사용할 때 함수형 state 변경이 안전해요.
6. 조건부 렌더링으로 상태에 맞는 화면을 보여줘요.
7. 배열 데이터는 `map()`과 props로 반복되는 카드가 돼요.

## 한번 해보기

- Counter가 0보다 작아지지 않게 조건을 추가해보세요.
- `Greeting`에 `age` props를 추가해보세요.
- 로그인 상태에서만 “마이페이지” 버튼이 보이게 만들어보세요.
- 도시 배열에 가격을 추가하고 카드에 표시해보세요.
- input 아래에 입력한 글자 수를 보여줘보세요.

오늘 문법은 이후 모든 React 수업의 바탕이 됩니다. 코드가 헷갈릴 때는 “누가 값을 가지고 있고, 누가 누구에게 props로 전달하고, 어떤 event가 값을 바꾸는가?” 세 질문부터 확인해보세요 ㅎㅎ
