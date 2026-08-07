# section04 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 화면 크기에 맞춰 레이아웃이 자연스럽게 달라지는 **반응형 디자인**을 배웠습니다. 미디어 쿼리로 스타일과 순서를 바꾸고, `rem` 단위와 Grid 레이아웃까지 함께 살펴봤어요.

오늘 흐름은 이렇게 기억하면 좋습니다.
**유연한 크기 만들기 → 미디어 쿼리로 분기하기 → rem으로 크기 정하기 → Grid로 행과 열 배치하기**

## 1. 고정된 width와 유연한 max-width

`01-responsive-design.html`에서는 이미지 상자의 최대 너비를 정하고, 이미지의 너비를 `%`로 지정했습니다.

```css
.이미지상자 {
  max-width: 1000px;
}
```

```html
<img src="./00-image.jpg" width="20%" height="150px" />
```

- `width: 1000px`은 화면이 작아져도 항상 1000px을 유지하려고 해요.
- `max-width: 1000px`은 최대 1000px까지만 커지고, 화면이 작아지면 함께 줄어들 수 있어요.
- `%`는 부모 크기를 기준으로 계산됩니다. 이미지의 `width="20%"`는 부모 너비의 20%라는 뜻이에요.

반응형 화면에서는 크기를 무조건 고정하기보다 `%`, `max-width`처럼 상황에 따라 달라질 수 있는 값을 자주 사용합니다.

## 2. 미디어 쿼리와 breakpoint

`02-media-query1.html`에서는 화면 너비가 500px 이하일 때 네모 상자의 모양을 바꿨습니다.

```css
.네모상자 {
  width: 300px;
  height: 300px;
  background-color: coral;
}

@media (max-width: 500px) {
  .네모상자 {
    width: 100px;
    height: 100px;
    background-color: skyblue;
    border-radius: 50%;
  }
}
```

- `@media`: 특정 화면 조건에서만 CSS를 적용해요.
- `max-width: 500px`: 뷰포트 너비가 500px 이하일 때라는 뜻이에요.
- `breakpoint`: 화면 구성이 달라지는 기준 너비를 말해요.

미디어 쿼리 안의 스타일은 기존 스타일을 모두 없애는 것이 아닙니다. 기존 스타일 위에 조건에 맞는 속성이 추가되고, 같은 속성은 CSS 우선순위와 작성 순서에 따라 새 값으로 덮어씌워져요.

## 3. 화면 크기에 따라 배치와 순서 바꾸기

`03-media-qeury2-with-order.html`에서는 넓은 화면에서 가로로 보이던 영역을 작은 화면에서 세로로 바꿨습니다.

```css
.부모 {
  display: flex;
  flex-direction: row;
}

@media (max-width: 767px) {
  .부모 {
    flex-direction: column;
  }

  .이미지영역 { order: 2; }
  .등록영역 { order: 1; }
}
```

- 넓은 화면: `row`로 이미지와 등록 영역을 가로 배치
- 767px 이하: `column`으로 세로 배치
- `order`: Flexbox 안에서 자식이 보이는 순서를 변경

HTML의 작성 순서를 바꾸지 않아도 화면 크기에 따라 중요한 내용을 먼저 보여줄 수 있습니다. 다만 `order`는 눈에 보이는 순서만 바꾸기 때문에, 접근성을 생각한다면 HTML 자체의 순서도 함께 고민해주세요.

## 4. rem 단위

`04-rem.html`에서는 루트 요소의 글자 크기를 기준으로 크기를 계산하는 `rem`을 배웠습니다.

```css
html {
  font-size: 62.5%;
}

.상자 {
  width: 10rem;
  height: 10rem;
}
```

- 브라우저의 기본 글자 크기 `16px`을 기준으로 보면 `1rem`은 기본적으로 `16px`이에요.
- `html`의 `font-size`를 `62.5%`로 바꾸면 `16px × 0.625 = 10px`이 됩니다.
- 따라서 이 예제에서는 `1rem = 10px`, `10rem = 100px`이에요.

`rem`은 항상 가장 바깥쪽 루트 요소인 `html`의 글자 크기를 기준으로 합니다. 기준값 하나를 바꾸면 여러 크기를 함께 조절할 수 있어서 일관된 UI를 만들 때 편리해요.

## 5. Grid로 행과 열 만들기

`05-grid.html`에서는 부모 요소에 Grid를 적용해서 이미지들을 행과 열로 배치했습니다.

```css
.부모 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 400px 400px 400px;
  column-gap: 70px;
  row-gap: 50px;
}
```

- `display: grid`: 자식들을 Grid 레이아웃으로 배치
- `grid-template-columns`: 열의 개수와 너비 지정
- `grid-template-rows`: 행의 개수와 높이 지정
- `fr`: 사용할 수 있는 공간을 나누는 비율 단위
- `column-gap`: 열 사이의 간격
- `row-gap`: 행 사이의 간격

`1fr 1fr 1fr`은 사용 가능한 가로 공간을 1:1:1 비율의 세 열로 나눈다는 뜻입니다. 같은 표현을 `repeat(3, 1fr)`로 작성할 수도 있어요.

```css
.부모 {
  place-items: center center;
  place-content: start center;
}
```

- `place-items`: 각 Grid 칸 안에서 자식 요소를 정렬해요.
- `place-content`: Grid 전체 영역을 부모 안에서 정렬해요.

둘 다 정렬과 관련 있지만, **칸 안의 자식**을 움직이는지 **Grid 전체**를 움직이는지가 다릅니다.

## 오늘의 핵심

1. `max-width`와 `%`를 사용하면 화면 크기에 유연하게 반응할 수 있어요.
2. `@media`는 특정 뷰포트 조건에서만 스타일을 적용해요.
3. Flexbox의 `flex-direction`과 `order`로 작은 화면의 배치 순서를 바꿀 수 있어요.
4. `rem`은 `html`의 글자 크기를 기준으로 계산해요.
5. Grid는 행과 열이 있는 레이아웃을 만들 때 편리해요.
6. `fr`은 Grid에서 남은 공간을 비율로 나누는 단위예요.

## 한번 해보기

- 화면이 600px 이하일 때 네모가 원으로 바뀌게 만들어보세요.
- PC에서는 3열, 모바일에서는 1열이 되는 이미지 Grid를 만들어보세요.
- `html`의 `font-size`를 바꾼 뒤 `rem`으로 만든 상자 크기가 어떻게 달라지는지 확인해보세요.
- 미디어 쿼리 안에서 `order`를 바꿔 등록 영역을 이미지보다 먼저 보여줘보세요!

반응형 디자인은 속성을 외우는 것보다 브라우저 너비를 직접 줄였다 늘려보는 게 가장 빠릅니다. 개발자 도구의 모바일 화면도 함께 사용하면서 어떤 breakpoint에서 레이아웃이 바뀌는지 눈으로 확인해보세요!
