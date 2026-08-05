# section03 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 스크롤과 이벤트 전파를 다루는 실습을 해봤습니다.
이번 파트는 화면 이동과 클릭 이벤트가 어떻게 동작하는지 이해하면 훨씬 쉬워져요.

오늘 흐름은 이렇게 기억하면 좋아요.
**스크롤 다루기 -> 앵커 이동하기 -> 스크롤 감지하기 -> 이벤트 버블링 제어하기**

## 1. window.scrollTo로 원하는 위치로 이동하기

`01-scroll1-window.html`에서는 버튼을 누르면 화면 맨 위로 부드럽게 올라가게 만들었습니다.

```js
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
```

- `top: 0`은 문서의 가장 위를 의미해요.
- `behavior: "smooth"`를 넣으면 부드럽게 이동해요.

스크롤이 긴 페이지에서 "맨 위로" 버튼 만들 때 자주 쓰는 방식입니다.

## 2. 앵커(#)로 특정 위치 바로 이동하기

`02-scroll-with-anchor1.html`, `02-scroll-with-anchor2-detail.html`에서는 앵커 링크를 사용했습니다.

- `href="...#normal"`처럼 `#아이디`를 붙이면 해당 id 위치로 이동해요.
- 상세 페이지 안에서도 `href="#legend"` 같은 방식으로 내부 이동이 가능해요.

그리고 `.스크롤박스`에 `scroll-behavior: smooth;`를 적용해서
박스 안 스크롤도 부드럽게 이동하도록 만들었습니다.

## 3. scroll 이벤트로 현재 스크롤 위치 읽기

`03-scroll-listener1-window.html`에서는 스크롤될 때마다 위치를 읽었습니다.

```js
window.addEventListener("scroll", () => {
  const 스크롤이내려간길이 = window.scrollY;

  if (스크롤이내려간길이 > 0) {
    document.getElementById("image").style.width = "500px";
  } else {
    document.getElementById("image").style.width = "1000px";
  }
});
```

- `window.scrollY`는 세로로 얼마나 내려왔는지(px) 알려줘요.
- 조건문과 함께 쓰면 "스크롤 상태에 따라 UI 바꾸기"가 가능해요.

예를 들면 헤더 크기 축소, 상단 버튼 노출 같은 기능에 활용됩니다.

## 4. 이벤트 버블링과 preventDefault

`04-event-bubbling-prevent-default.html`에서는 버튼이 `a` 태그 안에 있을 때를 다뤘습니다.

- 기본적으로 버튼 클릭 이벤트는 부모로 전파될 수 있어요.
- `a` 태그는 클릭 시 이동하는 기본 기능이 있어요.
- `event.preventDefault()`를 사용하면 링크 이동 같은 기본 동작을 막을 수 있어요.

즉, "좋아요만 누르고 페이지 이동은 막기" 같은 상황에서 유용합니다.

## 5. stopPropagation으로 부모 클릭 막기

`05-event-bubbling-stop-propagation.html`에서는
부모 영역 클릭 기능(프로필 이동)과 자식 버튼 클릭 기능(좋아요)을 분리했습니다.

```js
const 좋아요기능 = (event) => {
  event.stopPropagation();
  alert("좋아요+1 되었습니다.");
};
```

- `event.stopPropagation()`은 이벤트 전파 자체를 멈춰요.
- 그래서 자식 버튼을 눌러도 부모의 `onclick`은 실행되지 않아요.

`preventDefault`와 `stopPropagation`은 비슷해 보여도 역할이 다릅니다.
- `preventDefault`: 기본 동작 막기
- `stopPropagation`: 전파 막기

## 오늘의 핵심

1. `window.scrollTo()`로 스크롤 위치를 코드로 이동할 수 있어요.
2. `#아이디` 앵커를 쓰면 페이지 내부/외부에서 원하는 위치로 점프할 수 있어요.
3. `window.scrollY`로 현재 스크롤 위치를 읽을 수 있어요.
4. `preventDefault()`는 태그의 기본 동작(예: 링크 이동)을 막아요.
5. `stopPropagation()`은 부모로 전달되는 클릭 이벤트를 막아요.

## 한번 해보기

- 우측 아래에 "맨 위로" 버튼을 만들고 일정 스크롤 이상일 때만 보이게 해보세요.
- 상세 페이지에 `#legend`, `#normal` 말고 섹션을 하나 더 추가해 이동해보세요.
- 부모는 상세 이동, 자식은 좋아요 기능을 가진 카드 UI를 하나 더 만들어보세요.

오늘 내용은 웹에서 진짜 자주 쓰이는 기능입니다.
직접 눌러보고, 스크롤해보고, 콘솔로 값을 확인하면서 익히면 금방 익숙해져요!
