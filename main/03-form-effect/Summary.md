# day03 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 input 값을 state에 저장하는 controlled form부터 validation, submit event, `useEffect`, cleanup까지 배웠습니다. `useEffect`는 자주 사용하지만 모든 코드를 넣는 장소가 아니라 React 화면과 외부 시스템을 맞추는 도구라는 점도 확인했어요.

오늘 흐름은 이렇게 기억하면 좋아요.  
**입력값 state에 저장하기 → 여러 조건 검사하기 → submit 막고 처리하기 → 렌더링 뒤 외부 시스템 연결하기 → cleanup으로 정리하기**

## 1. controlled input

`steps/01-controlled-input.jsx`에서는 input의 `value`와 `onChange`를 같은 state에 연결했습니다.

```jsx
const [email, setEmail] = useState(\"\")

<input
  value={email}
  onChange={(event) => setEmail(event.target.value)}
/>
```

사용자가 입력하면 event 함수가 실행되고 state가 바뀝니다. 바뀐 state가 다시 `value`로 전달되기 때문에 React가 input 값을 알고 있어요.

## 2. 여러 input과 활성 버튼

`steps/02-multiple-inputs.jsx`에서는 이메일, 비밀번호, 닉네임을 각각 state로 저장했습니다.

```jsx
const isActive = email !== \"\" && password.length >= 4
```

`&&`로 두 조건을 연결하면 둘 다 참일 때만 `isActive`가 true가 됩니다.

```jsx
<button disabled={!isActive}>로그인</button>
```

화면의 색상만 바꾸는 것과 실제 `disabled` 속성으로 클릭을 막는 것은 다릅니다. 사용자의 잘못된 동작을 막아야 한다면 속성도 함께 적용해주세요.

## 3. form submit과 preventDefault

form 안의 submit 버튼을 누르면 브라우저는 기본적으로 페이지를 새로 요청하려고 합니다. React에서 직접 값을 검사하려면 이 기본 동작을 먼저 막아요.

```jsx
function handleSubmit(event) {
  event.preventDefault()
}
```

`steps/03-validation.jsx`에서는 이메일과 비밀번호를 순서대로 검사하고, 올바르지 않으면 오류 문장을 보여줬습니다.

## 4. validation은 어디까지 할까요?

프론트엔드 validation은 사용자가 실수를 빠르게 알아차리게 도와줘요.

- 빈 값인지 확인
- 이메일 기본 모양 확인
- 비밀번호 최소 길이 확인
- 비밀번호와 비밀번호 확인이 같은지 확인

하지만 프론트엔드 검사는 보안 장치가 아니에요. 요청을 직접 조작할 수 있으므로 백엔드에서도 반드시 다시 검사해야 합니다.

## 5. useEffect는 언제 실행될까요?

Effect는 컴포넌트가 화면에 반영된 뒤 실행됩니다.

```jsx
useEffect(() => {
  document.title = `예약 인원 ${count}명`
}, [count])
```

dependency 배열을 기준으로 실행 시점이 달라져요.

| 모양 | 실행 시점 |
|---|---|
| `useEffect(fn)` | 렌더링 뒤마다 실행 |
| `useEffect(fn, [])` | 첫 화면 뒤 한 번 실행 |
| `useEffect(fn, [count])` | 첫 화면과 count가 바뀐 뒤 실행 |

## 6. 외부 시스템과 맞춘다는 뜻

`steps/04-effect-title.jsx`의 `document.title`, `steps/05-effect-timer.jsx`의 timer, `steps/06-effect-storage.jsx`의 localStorage는 React가 직접 관리하는 값이 아닙니다.

```text
React state 변경
→ 화면 렌더링
→ Effect 실행
→ browser API 또는 외부 시스템과 동기화
```

API Query도 무조건 Effect 안에서 직접 작성할 필요는 없어요. 이후 배우는 Apollo나 React Query가 요청 시점과 상태를 관리해줍니다.

## 7. cleanup 함수

timer나 event listener가 남아 있으면 화면이 사라진 뒤에도 계속 실행될 수 있어요.

```jsx
useEffect(() => {
  const timerId = setInterval(runTimer, 1000)

  return () => clearInterval(timerId)
}, [])
```

Effect가 다시 실행되기 전 또는 컴포넌트가 사라질 때 return한 cleanup 함수가 실행됩니다.

## 8. state로 계산할 수 있는 값은 다시 만들지 않기

`email`과 `password`로 바로 계산할 수 있는 `isActive`는 별도 state가 없어도 됩니다.

```jsx
const isActive = email !== \"\" && password.length >= 4
```

같은 정보를 state 두 곳에 보관하면 한쪽만 변경되어 값이 어긋날 수 있어요. 기존 state에서 계산할 수 있다면 렌더링 중 계산하는 편이 단순합니다.

## 9. 홈페이지에서 만날 수 있는 Hook 세 가지

`steps/07-common-hooks.jsx`에서는 작은 여행 검색 화면을 만들며 세 가지 Hook을 함께 사용했습니다.

- `useRef`: input에 커서를 보내는 것처럼 실제 HTML 요소를 가리킬 때
- `useMemo`: 검색이나 정렬처럼 계산한 결과를 기억할 때
- `useCallback`: 자식 컴포넌트에 전달할 함수를 기억할 때

```jsx
const searchInputRef = useRef(null)

const filteredTrips = useMemo(() => {
  return trips.filter((trip) => trip.title.includes(keyword))
}, [keyword])

const handleTripSelect = useCallback((tripTitle) => {
  setSelectedTrip(tripTitle)
}, [])
```

Hook은 컴포넌트 함수의 가장 위쪽에서 호출해야 합니다. `if`, `for`, 클릭 함수 안에서 Hook을 새로 호출하지 않아요.

`useMemo`와 `useCallback`은 모든 곳에 미리 넣는 필수 문법이 아닙니다. 작은 계산과 간단한 함수는 그냥 작성하는 편이 더 읽기 쉬워요. 화면이 느려지거나 `memo`를 사용하는 자식의 불필요한 렌더링을 줄여야 할 때 검토합니다.

예제의 `TripCard`는 `memo()`로 감쌌습니다. 부모가 다시 렌더링되더라도 카드의 props가 같으면 카드를 다시 그리지 않습니다. 이때 `useCallback`으로 같은 함수를 전달해야 `memo()`의 비교가 의미를 가질 수 있어요.

Vite 개발 화면에서 `StrictMode`를 사용하면 확인을 위해 console 메시지가 두 번 보일 수도 있습니다. 배포된 홈페이지에서 똑같이 두 번 실행된다는 뜻은 아니에요.

## 10. 오늘 자주 만난 오류

- `event.preventDefault()`를 빼면 submit 뒤 페이지가 새로고침될 수 있어요.
- 숫자 input의 `event.target.value`도 기본적으로 문자열이에요.
- Effect 안에서 state를 바꾸고 그 state를 dependency에 넣으면 반복 실행될 수 있어요.
- timer cleanup을 빼면 timer가 여러 개 겹칠 수 있어요.
- 브라우저 API는 서버 렌더링 중에는 존재하지 않아요.

## 오늘의 핵심

1. controlled input은 value와 onChange를 state에 연결해요.
2. form submit의 기본 이동은 `preventDefault()`로 막을 수 있어요.
3. validation은 사용자 경험을 돕지만 서버 검사도 필요해요.
4. Effect는 렌더링 뒤 외부 시스템과 맞출 때 사용해요.
5. dependency 배열은 Effect가 다시 실행되는 기준이에요.
6. timer와 listener는 cleanup으로 정리해요.
7. 기존 state로 계산할 수 있는 값은 불필요하게 state로 만들지 않아요.
8. 실제 HTML 요소를 직접 가리켜야 할 때는 useRef를 사용할 수 있어요.
9. useMemo와 useCallback은 필요할 때 사용하는 최적화 도구예요.

## 한번 해보기

- 비밀번호가 8글자 이상일 때만 버튼을 활성화해보세요.
- 이메일 오류와 비밀번호 오류를 따로 보여줘보세요.
- 10초 뒤 멈추는 timer를 만들어보세요.
- 버튼을 누르면 메모를 localStorage에 저장하고 새로고침해보세요.
- `document.title`에 현재 입력한 여행지를 표시해보세요.
- `useRef`로 버튼을 누르면 검색 input에 커서가 가도록 만들어보세요.
- 검색어가 같을 때 useMemo의 console 메시지가 다시 나오는지 확인해보세요.
- TripCard의 `memo`를 지우고 방문 횟수 버튼을 눌러 렌더링 차이를 확인해보세요.

Effect가 어렵게 느껴질 때는 먼저 “이 코드는 사용자의 event인가, 화면을 계산하는 코드인가, React 밖의 시스템과 맞추는 코드인가?”를 구분해보세요. 마지막 경우에 Effect를 검토하면 됩니다 ㅎㅎ
