# section09 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 웹사이트에 원하는 폰트를 적용하고, 여러 브라우저에서도 화면이 최대한 비슷하게 동작하도록 확인하는 **크로스 브라우징**을 배웠습니다. 폰트가 다운로드되는 동안 글자를 어떻게 보여줄지도 함께 살펴봤어요.

오늘 흐름은 이렇게 기억하면 좋아요.
**웹폰트 등록하기 → 브라우저별 차이 확인하기 → 지원 범위 조사하기 → 폰트 로딩 방식 정하기**

## 1. HTML과 브라우저

`01-aaaa.html`에서는 간단한 HTML과 CSS 파일을 브라우저가 어떻게 해석하는지 확인했습니다.

```html
<div class="qqq">apple, banana, orange</div>
```

```css
.qqq {
  color: red;
}
```

같은 웹 표준을 사용하더라도 브라우저의 종류와 버전, 운영체제에 따라 기본 스타일이나 일부 기능의 결과가 달라질 수 있어요. 그래서 Chrome 한 곳에서만 확인하지 않고 Safari, Firefox, Edge와 모바일 환경도 함께 확인하는 과정이 필요합니다.

## 2. @font-face로 웹폰트 등록하기

`01-font.html`에서는 프로젝트 안에 있는 폰트 파일을 CSS에 등록했습니다.

```css
@font-face {
  font-family: "지용폰트";
  src: url("./00-myfont01-thin.woff2");
}

@font-face {
  font-family: "지용폰트-bold";
  src: url("./00-myfont02-thick.woff2");
}
```

- `@font-face`: 외부 폰트 파일을 웹사이트에서 사용할 수 있도록 등록해요.
- `font-family`: CSS에서 사용할 폰트의 이름을 정해요.
- `src`: 실제 폰트 파일의 위치를 작성해요.

등록한 뒤에는 일반 폰트처럼 사용할 수 있습니다.

```css
.얇은폰트 {
  font-family: "지용폰트", sans-serif;
}

.두꺼운폰트 {
  font-family: "지용폰트-bold", sans-serif;
}
```

웹폰트를 불러오지 못하는 상황을 대비해 마지막에 `sans-serif` 같은 기본 폰트 계열도 함께 작성해두면 좋아요.

## 3. 폰트 굵기는 하나의 family로 관리하기

얇은 폰트와 굵은 폰트를 서로 다른 이름으로 등록할 수도 있지만, 실제 프로젝트에서는 같은 `font-family`에 굵기만 다르게 등록하는 방식도 자주 사용합니다.

```css
@font-face {
  font-family: "지용폰트";
  src: url("./00-myfont01-thin.woff2") format("woff2");
  font-weight: 300;
}

@font-face {
  font-family: "지용폰트";
  src: url("./00-myfont02-thick.woff2") format("woff2");
  font-weight: 700;
}
```

```css
.얇은폰트 { font-weight: 300; }
.두꺼운폰트 { font-weight: 700; }
```

이렇게 하면 폰트 이름은 하나로 유지하면서 `font-weight`로 굵기를 선택할 수 있어요.

## 4. 브라우저 전용 CSS와 벤더 프리픽스

`02-css-cross-browsing-issue.html`에서는 날짜 입력창 내부를 꾸미는 WebKit 전용 선택자를 확인했습니다.

```css
.달력::-webkit-datetime-edit-year-field,
.달력::-webkit-datetime-edit-month-field,
.달력::-webkit-datetime-edit-day-field {
  display: none;
}
```

`-webkit-`처럼 앞에 붙는 이름을 **벤더 프리픽스**라고 합니다. 특정 브라우저 엔진에서만 제공하는 기능이므로 다른 브라우저에서는 적용되지 않거나 다르게 보일 수 있어요.

브라우저 전용 기능을 사용할 때는 다음을 함께 생각해주세요.

1. 지원되지 않아도 핵심 기능을 사용할 수 있는가?
2. 다른 브라우저에서 대신 보여줄 기본 화면이 있는가?
3. 실제 지원 범위를 확인했는가?

## 5. 크로스 브라우징과 기능 지원 확인

크로스 브라우징은 모든 브라우저를 픽셀 하나까지 똑같게 만드는 것이 아니라, **지원 대상 브라우저에서 중요한 기능과 정보가 정상적으로 전달되게 만드는 것**에 가깝습니다.

새로운 CSS를 적용하기 전에는 Can I Use 같은 호환성 자료에서 다음 내용을 확인하면 좋아요.

- 어떤 브라우저와 버전부터 지원하는지
- 모바일 브라우저도 지원하는지
- 일부만 지원되는 기능인지
- 별도의 접두어나 대체 방법이 필요한지

지원되지 않는 기능이라면 기본 CSS를 먼저 작성하고, 지원되는 환경에서만 향상된 스타일을 추가하는 방식으로 대비할 수 있습니다.

## 6. overflow-anchor와 늦게 나타나는 콘텐츠

`03-css-cross-browsing-issue2.html`에서는 5초 뒤 이미지가 나타나는 상황을 만들고 스크롤 위치가 어떻게 달라지는지 확인했습니다.

```css
.스크롤박스 {
  width: 500px;
  height: 700px;
  overflow: scroll;
  overflow-anchor: auto;
}
```

```js
setTimeout(() => {
  document.getElementById("사진박스ID").style.display = "block"
}, 5000)
```

사용자가 글을 읽는 중 위쪽에 이미지가 늦게 추가되면 기존 내용이 아래로 밀릴 수 있어요. 스크롤 앵커링은 이런 변화가 생겨도 사용자가 보던 위치를 최대한 유지하려는 브라우저 기능입니다.

- `overflow-anchor: auto`: 브라우저의 스크롤 앵커링 사용
- `overflow-anchor: none`: 특정 요소나 영역을 앵커 대상으로 사용하지 않도록 설정

이 속성 역시 브라우저별 지원과 동작 차이를 확인한 뒤 사용해야 해요.

## 7. 폰트 파일 형식과 호환성

`04-bad-font.html`에서는 `.woff2`와 `.ttf` 폰트 파일을 비교했습니다.

- `WOFF2`: 웹 전송에 적합하게 압축된 형식으로, 파일 크기가 작아 웹폰트에 많이 사용돼요.
- `TTF`: 오래된 환경을 포함해 넓게 사용되지만 웹 전달 용량이 더 클 수 있어요.

폰트 형식마다 브라우저 지원 범위와 파일 크기가 다릅니다. 대상 브라우저를 확인하고 필요한 형식을 제공해야 하며, 라이선스상 웹 사용이 허용된 폰트인지도 꼭 확인해주세요.

## 8. FOIT와 FOUT, font-display

웹폰트는 다운로드 시간이 필요하기 때문에 로딩 중 글자를 어떻게 보여줄지 정해야 합니다.

- FOIT(Flash of Invisible Text): 폰트를 기다리는 동안 글자가 잠시 보이지 않는 현상
- FOUT(Flash of Unstyled Text): 기본 폰트를 먼저 보여주고 다운로드 후 웹폰트로 바뀌는 현상

이를 조절하는 `font-display`는 폰트를 사용하는 일반 클래스가 아니라 **`@font-face` 안에 작성**해야 합니다.

```css
@font-face {
  font-family: "지용폰트-block";
  src: url("./00-myfont02-thick.woff2") format("woff2");
  font-display: block;
}

@font-face {
  font-family: "지용폰트-swap";
  src: url("./00-myfont02-thick.woff2") format("woff2");
  font-display: swap;
}
```

- `block`: 짧은 시간 글자를 숨기고 웹폰트를 기다려요.
- `swap`: 기본 폰트를 바로 보여주고 웹폰트가 준비되면 바꿔요.

사용자가 내용을 빠르게 읽는 것이 중요하다면 보통 `swap`을 많이 고려합니다. 다만 폰트가 바뀔 때 글자 폭이 달라져 레이아웃이 움직일 수 있으므로 비슷한 기본 폰트를 함께 선택하는 것도 중요해요.

## 오늘의 핵심

1. `@font-face`로 프로젝트의 폰트 파일을 등록할 수 있어요.
2. 폰트마다 `font-weight`를 지정하면 하나의 family로 굵기를 관리할 수 있어요.
3. 브라우저 전용 선택자와 최신 CSS는 브라우저별 지원이 다를 수 있어요.
4. 크로스 브라우징은 대상 환경에서 핵심 기능이 정상 동작하도록 확인하는 과정이에요.
5. `overflow-anchor`는 콘텐츠가 늦게 추가될 때 스크롤 위치 유지와 관련된 속성이에요.
6. 웹폰트는 용량, 지원 범위, 라이선스를 함께 확인해야 해요.
7. `font-display`는 `@font-face` 안에 작성하고 폰트 로딩 중 표시 방식을 정해요.

## 한번 해보기

- 얇은 폰트와 굵은 폰트를 같은 family에 등록하고 `font-weight`로 바꿔보세요.
- `font-display: block`과 `swap`을 번갈아 사용해 로딩 화면을 비교해보세요.
- 날짜 입력창 예제를 Chrome과 Safari 또는 Firefox에서 열어 차이를 확인해보세요.
- 사용하려는 CSS 속성 하나를 정하고 대상 브라우저의 지원 범위를 조사해보세요!

크로스 브라우징은 속성을 많이 외우는 것보다 “이 기능이 지원되지 않아도 사용자가 내용을 이용할 수 있는가?”를 먼저 생각하는 것이 중요합니다. 새로운 기능을 사용할 때는 기본 화면과 대체 방법도 함께 준비해주세요 ㅎㅎ
