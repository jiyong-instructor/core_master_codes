# section05 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 사용자의 키보드와 마우스 행동을 감지하고, 브라우저가 제공하는 여러 기능을 자바스크립트로 사용하는 방법을 배웠습니다. 마지막에는 `setTimeout()`을 이용해 잠시 뒤 코드를 실행하는 타이머까지 만들어봤어요.

오늘 흐름은 이렇게 기억하면 좋습니다.
**이벤트 감지하기 → form으로 입력 묶기 → 브라우저 API 사용하기 → 타이머로 실행 시점 조절하기**

## 1. keydown으로 키보드 감지하기

`01-keyboard.html`에서는 방향키를 눌러 이미지의 위치를 움직였습니다.

```js
window.addEventListener("keydown", (event) => {
  console.log(event.key)
})
```

- `addEventListener()`: 원하는 이벤트가 발생했을 때 실행할 함수 등록
- `keydown`: 키보드의 키를 누른 순간 발생하는 이벤트
- `event.key`: 사용자가 누른 키의 이름

방향키는 `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`라는 값으로 확인할 수 있습니다.

```js
switch (event.key) {
  case "ArrowUp":
    // 위로 이동
    break
  case "ArrowDown":
    // 아래로 이동
    break
}
```

현재 위치는 `getComputedStyle()`로 가져오고, `"300px"`에서 `px`을 제거한 뒤 `Number()`를 이용해 계산할 수 있는 숫자로 바꿨습니다.

```js
const 스타일 = getComputedStyle(춘식이)
const Y좌표 = Number(스타일.top.replace("px", ""))
```

`Shift`를 누르는 동안만 부스터를 사용하려면 `keydown`에서 켜고 `keyup`에서 다시 원래 값으로 돌려주는 흐름으로 확장할 수 있어요.

## 2. Enter와 현재 선택된 입력창 확인하기

`02-keyboard-with-input.html`에서는 제목이나 내용 입력창에서 Enter를 눌렀을 때 등록 기능을 실행했습니다.

```js
window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (
      document.activeElement.id === "제목입력창ID" ||
      document.activeElement.id === "내용입력창ID"
    ) {
      엔터감지등록기능()
    }
  }
})
```

- `document.activeElement`: 현재 사용자가 선택해서 입력하고 있는 요소
- `||`: 여러 조건 중 하나라도 참인지 확인하는 OR 연산자

Enter가 눌렸다는 이유만으로 무조건 등록하지 않고, 현재 입력 중인 요소까지 함께 확인했습니다.

## 3. form과 submit 이벤트

`03-form1.html`과 `03-form2-with-button.html`에서는 제목과 내용을 하나의 `form`으로 묶고 등록 기능을 연결했습니다.

```html
<form onsubmit="글등록기능()">
  제목: <input type="text" />
  내용: <input type="text" />
  <button type="submit">등록하기</button>
</form>
```

`form` 안의 submit 버튼을 클릭하거나 입력창에서 Enter를 누르면 `submit` 이벤트가 발생합니다. 클릭과 Enter 기능을 각각 만드는 대신 form의 제출 흐름으로 한 번에 처리할 수 있어요.

form은 제출하면 기본적으로 페이지를 새로고침합니다. 연습 중 새로고침을 막고 싶다면 이벤트를 받아 `event.preventDefault()`를 사용할 수 있습니다.

```js
const 글등록기능 = (event) => {
  event.preventDefault()
  alert("게시글 등록이 완료되었습니다.")
}
```

## 4. 브라우저 API 지원 여부 확인하기

`04-brower-api.html`에서는 현재 브라우저가 어떤 API를 제공하는지 확인했습니다.

```js
const API목록 = [
  { 이름: "Fetch API", 지원여부: typeof fetch === "function" },
  { 이름: "Geolocation API", 지원여부: navigator.geolocation !== undefined },
  { 이름: "Service Worker API", 지원여부: "serviceWorker" in navigator }
]
```

브라우저 API는 브라우저가 자바스크립트에서 사용할 수 있도록 제공하는 기능입니다. DOM, 웹 스토리지, 위치 정보, 알림, WebSocket 등이 여기에 포함돼요.

API가 존재하는지 확인하는 것과 사용자가 권한을 허용하는 것은 서로 다른 이야기입니다. 브라우저가 위치 정보 기능을 지원해도 사용자가 권한을 거절하면 실제 위치는 가져올 수 없어요.

## 5. Clipboard API로 내용 복사하기

`05-navigator-clipboard.html`에서는 화면의 글자를 클립보드에 복사했습니다.

```js
const 내용 = document.getElementById("복사할내용").innerText
navigator.clipboard.writeText(내용)
```

- `innerText`: 화면에 보이는 글자 가져오기
- `navigator.clipboard.writeText()`: 글자를 클립보드에 저장하기

템플릿 리터럴로 원래 내용을 꾸민 뒤 복사할 수도 있습니다.

```js
const 꾸며진내용 = `*** ${내용} ***`
navigator.clipboard.writeText(꾸며진내용)
```

Clipboard API는 보안이 적용된 환경에서 동작하며 브라우저 권한이나 설정의 영향을 받을 수 있습니다. 실제 서비스에서는 복사가 성공했을 때와 실패했을 때를 나눠 처리하면 더 안전해요.

## 6. Geolocation API로 위치 가져오기

`06-navigator-geolocation.html`에서는 사용자의 위도와 경도를 가져와 지도 링크에 연결했습니다.

```js
navigator.geolocation.getCurrentPosition(
  (내위치) => {
    console.log(내위치.coords.latitude)
    console.log(내위치.coords.longitude)
  },
  (에러) => {
    console.log(에러.code)
  }
)
```

`getCurrentPosition()`에는 위치를 가져오는 데 성공했을 때 실행할 함수와 실패했을 때 실행할 함수를 전달합니다.

- `coords.latitude`: 위도
- `coords.longitude`: 경도
- 성공 콜백: 위치 정보를 정상적으로 가져왔을 때 실행
- 실패 콜백: 권한 거절이나 위치 확인 실패 시 실행

위치 정보는 개인정보이기 때문에 반드시 사용자 권한이 필요합니다. 예제의 샘플 위치 기능처럼 실제 위치 없이도 화면 동작을 먼저 연습해볼 수 있어요.

## 7. 마우스 이벤트와 setTimeout

`07-timer.html`에서는 마우스를 따라다니는 망치를 만들고, 이미지를 클릭하면 2초 동안 숨겼다가 다시 보여줬습니다.

```js
window.addEventListener("mousemove", (event) => {
  나의마우스.style.top = `${event.clientY + 5}px`
  나의마우스.style.left = `${event.clientX + 5}px`
})
```

- `mousemove`: 마우스가 움직일 때마다 발생
- `event.clientX`: 현재 화면을 기준으로 한 마우스의 가로 좌표
- `event.clientY`: 현재 화면을 기준으로 한 마우스의 세로 좌표

```js
const 춘식이잡기기능 = (춘식이번호) => {
  document.getElementById(춘식이번호).style.display = "none"

  setTimeout(() => {
    document.getElementById(춘식이번호).style.display = "block"
  }, 2000)
}
```

`setTimeout(실행할 함수, 기다릴 시간)`은 정해진 시간이 지난 뒤 함수를 한 번 실행합니다. 시간은 밀리초 단위이므로 `2000`은 2초예요.

클릭한 이미지의 ID를 함수에 전달하면 같은 함수를 여러 이미지에서 함께 사용할 수 있습니다.

## 오늘의 핵심

1. `addEventListener()`로 키보드와 마우스 이벤트를 감지할 수 있어요.
2. 누른 키는 `event.key`, 현재 선택된 요소는 `document.activeElement`로 확인해요.
3. `form`의 `submit`을 사용하면 클릭과 Enter 제출을 함께 처리할 수 있어요.
4. 브라우저 API의 지원 여부와 사용자 권한 허용 여부는 다른 개념이에요.
5. Clipboard API는 글자 복사, Geolocation API는 위치 확인에 사용해요.
6. `event.clientX`, `event.clientY`로 화면 기준 마우스 좌표를 가져올 수 있어요.
7. `setTimeout()`은 기다린 뒤 코드를 한 번 실행해요.

## 한번 해보기

- `W`, `A`, `S`, `D` 키로 이미지가 움직이도록 만들어보세요.
- form을 제출했을 때 새로고침을 막고 입력값을 콘솔에 출력해보세요.
- 복사 성공 메시지를 화면에 토스트로 보여줘보세요.
- 이미지를 클릭하면 1초 뒤 다른 위치에서 다시 나타나게 만들어보세요!

오늘은 사용자의 행동과 브라우저 기능을 자바스크립트에 연결해봤습니다. 이벤트가 언제 발생하고 `event` 안에 어떤 값이 들어오는지 콘솔로 자주 확인하면 훨씬 빠르게 익숙해질 수 있어요!
