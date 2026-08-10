# section06 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 이미지의 크기와 비율을 예쁘게 맞추는 방법부터, 페이지가 이동할 때 자연스러운 애니메이션을 보여주는 방법까지 배웠습니다.

오늘 흐름은 이렇게 기억하면 좋아요.
**이미지 맞추기 → 비율 유지하기 → 페이지 진입·퇴장 효과 만들기 → View Transition으로 화면 전환하기**

## 1. object-fit으로 이미지 맞추기

`01-object-fit.html`에서는 크기가 서로 다른 이미지를 같은 크기의 영역에 넣는 방법을 확인했습니다.

```css
.이미지1 {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.이미지2 {
  width: 300px;
  height: 300px;
  object-fit: contain;
}
```

- `cover`: 영역을 빈틈없이 채워요. 이미지 일부가 잘릴 수 있어요.
- `contain`: 이미지 전체가 보이도록 영역 안에 맞춰요. 남는 공간이 생길 수 있어요.

프로필 사진이나 카드 썸네일처럼 영역을 꽉 채우는 것이 중요하면 `cover`, 상품 사진처럼 전체 모습이 보여야 한다면 `contain`이 잘 어울려요.

## 2. aspect-ratio로 비율 유지하기

`02-aspect-ratio.html`에서는 가로나 세로 중 한쪽 크기만 정하고 나머지 크기를 비율에 맞춰 자동으로 계산했습니다.

```css
.이미지 {
  width: 300px;
  aspect-ratio: 3 / 1;
}
```

- `aspect-ratio: 3 / 1`: 가로와 세로의 비율을 3:1로 유지해요.
- 가로 크기를 알면 세로 크기가 자동으로 계산돼요.
- 세로 크기를 알면 가로 크기가 자동으로 계산돼요.
- 이미지뿐 아니라 `div`, `button` 같은 일반 태그에도 사용할 수 있어요.

`width: 300px`에 `aspect-ratio: 3 / 1`을 적용하면 높이는 100px이 됩니다.

## 3. object-fit과 aspect-ratio 함께 사용하기

`03-object-fit-aspect-ratio.html`에서는 여러 이미지를 모두 16:9 비율로 맞춰 세로 스크롤 목록을 만들었습니다.

```css
.스크롤박스 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 500px;
  overflow: scroll;
}

.이미지 {
  width: 300px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

`aspect-ratio`가 모든 이미지의 영역을 같은 비율로 만들고, `object-fit: cover`가 그 영역을 이미지로 빈틈없이 채워줘요. 원본 이미지의 크기가 달라도 카드 목록을 일정하게 보여줄 수 있습니다.

## 4. 다음 페이지가 들어오는 애니메이션

`04-page-effect1.html`과 `04-page-effect2-detail.html`에서는 링크로 상세 페이지에 이동한 뒤, 상세 화면이 오른쪽에서 들어오는 효과를 만들었습니다.

```css
.페이지 {
  animation-name: 다음페이지애니메이션;
  animation-duration: 0.5s;
}

@keyframes 다음페이지애니메이션 {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
```

- `translateX(100%)`: 요소 자신의 너비만큼 오른쪽으로 이동한 위치
- `translateX(0%)`: 원래 위치
- 페이지가 열리자마자 애니메이션이 실행되면서 오른쪽에서 가운데로 들어와요.

## 5. 애니메이션이 끝난 뒤 뒤로 가기

`05-page-effect1-back.html`과 `05-page-effect2-back-detail.html`에서는 뒤로가기 버튼을 누르면 화면이 먼저 나간 뒤 실제 페이지를 이동하도록 만들었습니다.

```js
const 나가기기능 = () => {
  document.getElementById("페이지").style.animationName = "뒤로가기애니메이션"

  window.addEventListener("animationend", () => {
    history.back()
  })
}
```

- `animationend`: CSS 애니메이션이 끝났을 때 발생하는 이벤트
- `history.back()`: 브라우저 방문 기록의 이전 페이지로 이동

버튼을 누르자마자 `history.back()`을 실행하면 퇴장 효과를 볼 수 없습니다. 그래서 **애니메이션 시작 → 끝나는 순간 감지 → 실제로 뒤로 이동** 순서로 연결했어요.

```css
@keyframes 뒤로가기애니메이션 {
  from { transform: translateX(0%); }
  to   { transform: translateX(100%); }
}
```

## 6. View Transition으로 페이지 전환하기

`06-view-transition1.html`과 `06-view-transition2.html`에서는 View Transition을 이용해 이전 화면과 새로운 화면에 각각 애니메이션을 적용했습니다.

```css
@view-transition {
  navigation: auto;
}
```

페이지 이동 전 화면은 `old`, 이동 후 새 화면은 `new`로 구분할 수 있어요.

```css
::view-transition-old(root) {
  animation-name: 이전페이지애니메이션;
  animation-duration: 0.4s;
}

::view-transition-new(root) {
  animation-name: 다음페이지애니메이션;
  animation-duration: 0.4s;
}
```

- `::view-transition-old(root)`: 사라지는 이전 페이지
- `::view-transition-new(root)`: 나타나는 새로운 페이지

직접 `animationend`와 `history.back()`을 연결하는 방식보다 페이지 전환의 이전·이후 화면을 한 흐름으로 다룰 수 있다는 장점이 있어요. 다만 브라우저 환경에 따라 지원 여부가 다를 수 있으니 실제 적용 전에는 꼭 확인해주세요.

애니메이션을 연결할 때는 `animation-name`에 작성한 이름과 `@keyframes` 이름이 정확히 같은지도 확인해야 합니다!

## 오늘의 핵심

1. `object-fit: cover`는 영역을 채우고, `contain`은 이미지 전체를 보여줘요.
2. `aspect-ratio`는 가로와 세로의 비율을 일정하게 유지해요.
3. 두 속성을 함께 사용하면 크기가 다른 이미지도 일정한 카드로 만들 수 있어요.
4. `translateX()`와 `@keyframes`로 페이지 진입·퇴장 효과를 만들 수 있어요.
5. `animationend`를 사용하면 애니메이션이 끝난 뒤 다음 기능을 실행할 수 있어요.
6. View Transition에서는 이전 화면과 새로운 화면을 각각 꾸밀 수 있어요.

## 한번 해보기

- 같은 사진에 `cover`와 `contain`을 번갈아 적용해 차이를 확인해보세요.
- 이미지 카드들을 1:1, 4:3, 16:9 비율로 각각 만들어보세요.
- 상세 페이지가 아래에서 위로 나타나도록 `translateY()`를 사용해보세요.
- 이전 페이지는 왼쪽으로 나가고 새 페이지는 오른쪽에서 들어오는 전환을 만들어보세요!

오늘 배운 속성은 이미지 목록과 모바일 앱처럼 보이는 페이지 전환을 만들 때 정말 유용합니다. 이미지가 찌그러지면 `aspect-ratio`와 `object-fit`부터, 전환 방향이 이상하면 keyframes의 시작점과 끝점부터 확인해보세요!
