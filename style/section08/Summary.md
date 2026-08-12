# section08 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 날짜 입력창을 원하는 모습으로 꾸미고, 여러 색상이 자연스럽게 이어지는 그라데이션을 배웠습니다. 마지막에는 그라데이션을 글자 안에 넣는 효과까지 만들어봤어요.

오늘 흐름은 이렇게 기억하면 좋아요.
**달력 클릭 영역 넓히기 → 안내 문구 만들기 → 날짜 선택 상태 구분하기 → 배경과 글자에 그라데이션 넣기**

## 1. date input과 달력 아이콘 꾸미기

`01-calendar.html`에서는 `input type="date"`가 가진 달력 선택 기능을 활용했습니다.

```html
<input type="date" class="달력" />
```

```css
.달력 {
  position: relative;
}

.달력::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
}
```

- `::-webkit-calendar-picker-indicator`: 날짜 입력창의 달력 선택 부분을 꾸미는 가상 요소예요.
- 달력 선택 부분을 입력창 전체로 넓히면 입력창의 어느 곳을 눌러도 달력을 열기 편해져요.
- `background: transparent`는 달력 선택 부분의 배경을 투명하게 만들어요.

`-webkit-`으로 시작하는 선택자는 브라우저 전용 기능입니다. 브라우저마다 표시 결과가 다를 수 있으므로 실제 서비스에서는 여러 브라우저에서 확인해주세요.

## 2. 달력에 안내 문구 만들기

`02-calendar-placeholder.html`에서는 날짜를 선택하기 전 `생일을 선택해요`라는 안내 문구를 보여줬습니다.

기본 날짜 글자들은 브라우저가 제공하는 가상 요소를 선택해 숨겼어요.

```css
.달력::-webkit-datetime-edit-text,
.달력::-webkit-datetime-edit-year-field,
.달력::-webkit-datetime-edit-month-field,
.달력::-webkit-datetime-edit-day-field {
  display: none;
}
```

그다음 HTML의 사용자 정의 속성에 안내 문구를 담았습니다.

```html
<input
  type="date"
  class="달력"
  달력플레이스홀더="생일을 선택해요"
/>
```

```css
.달력::after {
  content: attr(달력플레이스홀더);
  position: absolute;
  top: 0;
  left: 0;
}
```

- `attr(속성이름)`: HTML 태그에 작성한 속성값을 CSS에서 가져와요.
- `::after`: 별도의 HTML 태그 없이 안내 문구를 만들어요.
- `content`: 가상 요소에 표시할 내용을 정해요.

실무에서 직접 만드는 사용자 정의 속성은 보통 `data-placeholder`처럼 `data-`로 시작하는 이름을 사용합니다.

## 3. required와 :valid, :invalid

`03-calendar-vaildation.html`에서는 날짜를 선택했는지에 따라 안내 문구와 실제 날짜를 번갈아 보여줬습니다.

```html
<input
  type="date"
  class="달력"
  달력플레이스홀더="생일을 선택해요"
  required
/>
```

- `required`: 반드시 값을 입력해야 하는 필수 항목으로 만들어요.
- `:valid`: 입력값이 HTML 유효성 조건을 만족하는 상태예요.
- `:invalid`: 입력값이 조건을 만족하지 못하는 상태예요.

```css
.달력:valid::-webkit-datetime-edit-year-field,
.달력:valid::-webkit-datetime-edit-month-field,
.달력:valid::-webkit-datetime-edit-day-field {
  display: inline;
  color: green;
}

.달력:valid::after {
  display: none;
}

.달력:invalid::after {
  color: orangered;
}
```

날짜를 선택하지 않은 `invalid` 상태에서는 안내 문구를 보여주고, 날짜를 선택한 `valid` 상태에서는 안내 문구를 숨긴 뒤 실제 날짜를 보여주는 흐름이에요.

## 4. linear-gradient로 선형 그라데이션 만들기

`04-liner-gradient.html`에서는 색상이 직선 방향으로 이어지는 선형 그라데이션을 만들었습니다.

```css
.상자 {
  background: linear-gradient(45deg, pink, purple);
}
```

- 첫 번째 값 `45deg`: 색상이 진행되는 각도
- `pink`: 시작 색상
- `purple`: 끝 색상

색상이 바뀌는 위치도 직접 정할 수 있어요.

```css
.상자 {
  background: linear-gradient(
    45deg,
    pink 0%,
    purple 30%,
    purple 100%
  );
}
```

같은 요소에 여러 그라데이션을 쉼표로 연결하면 배경을 여러 겹으로 쌓을 수도 있습니다.

```css
.상자 {
  background:
    linear-gradient(45deg, yellow, transparent),
    linear-gradient(135deg, red, transparent),
    linear-gradient(225deg, blue, transparent),
    linear-gradient(315deg, green, transparent);
}
```

`transparent`는 완전히 투명한 색상이라서 아래에 겹친 다른 그라데이션도 함께 보이게 해줘요.

## 5. radial-gradient로 원형 그라데이션 만들기

`05-radial-gradient.html`에서는 중심에서 바깥쪽으로 퍼지는 원형 그라데이션을 만들었습니다.

```css
.상자1 {
  background: radial-gradient(pink, purple);
}

.상자2 {
  background: radial-gradient(red, yellow, green);
}
```

선형 그라데이션처럼 각 색상이 시작되는 지점도 지정할 수 있어요.

```css
.상자 {
  background: radial-gradient(
    pink 0%,
    pink 50%,
    purple 50%,
    purple 100%
  );
}
```

같은 위치에 서로 다른 색상을 지정하면 색상이 부드럽게 섞이지 않고 경계가 또렷하게 나뉘는 효과를 만들 수 있습니다.

## 6. rgba와 투명도

그라데이션 색상은 색상 이름뿐 아니라 `rgb()`와 `rgba()`로도 작성할 수 있습니다.

```css
background: linear-gradient(
  42deg,
  rgba(103, 206, 224, 1) 0%,
  rgb(133, 227, 164) 50%,
  rgb(237, 237, 124) 100%
);
```

- R: 빨간색 값
- G: 초록색 값
- B: 파란색 값
- A: 투명도 값

투명도는 `0`이면 완전히 투명하고 `1`이면 완전히 보입니다.

## 7. 글자에 그라데이션 넣기

`06-text-gradient.html`에서는 배경 그라데이션을 글자 모양 안에서만 보이도록 만들었습니다.

```css
.텍스트 {
  background: linear-gradient(
    42deg,
    rgb(103, 206, 224),
    rgb(133, 227, 164),
    rgb(237, 237, 124)
  );

  background-clip: text;
  color: transparent;
}
```

- `background-clip: text`: 배경을 글자 모양 안에서만 보여줘요.
- `color: transparent`: 원래 글자색을 투명하게 만들어 뒤의 그라데이션이 보여요.

둘 중 하나만 빠져도 원하는 텍스트 그라데이션이 보이지 않을 수 있으므로 한 세트로 기억해주세요.

## 오늘의 핵심

1. `input type="date"`로 브라우저의 달력 입력 기능을 사용할 수 있어요.
2. `attr()`을 이용하면 HTML 속성값을 가상 요소의 내용으로 가져올 수 있어요.
3. `required`, `:valid`, `:invalid`로 날짜 선택 전후의 상태를 구분할 수 있어요.
4. `linear-gradient()`는 직선 방향, `radial-gradient()`는 중심에서 바깥 방향으로 색상이 이어져요.
5. `%`를 지정하면 각 색상이 시작되거나 끝나는 위치를 조절할 수 있어요.
6. 여러 그라데이션은 쉼표로 연결해서 겹칠 수 있어요.
7. `background-clip: text`와 `color: transparent`를 함께 사용하면 글자 그라데이션을 만들 수 있어요.

## 한번 해보기

- 날짜를 선택하기 전에는 빨간 안내 문구, 선택한 뒤에는 파란 날짜가 보이게 만들어보세요.
- 세 가지 색상이 90도 방향으로 이어지는 선형 그라데이션을 만들어보세요.
- 원의 중심은 흰색이고 바깥쪽은 검은색인 원형 그라데이션을 만들어보세요.
- 좋아하는 색상 3개를 골라 제목 글자에 그라데이션을 적용해보세요!

오늘은 브라우저가 기본으로 제공하는 달력도 CSS 선택자를 이용해 원하는 모습으로 바꿀 수 있다는 것을 확인했습니다. 그라데이션은 각도와 색상 위치를 조금씩 바꿔보면서 눈으로 익히는 게 가장 빨라요 ㅎㅎ
