# section07 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 체크박스 같은 기본 입력 요소를 원하는 모습으로 꾸미고, CSS 선택자와 변수를 활용해서 토글·드롭다운·다크 모드까지 만들어봤습니다.

오늘 흐름은 이렇게 기억하면 좋아요.
**기본 입력 색상 바꾸기 → 체크 상태로 UI 제어하기 → CSS 변수로 값 전달하기 → 다크 모드 스타일 한 번에 바꾸기**

## 1. accent-color로 입력 요소 색상 바꾸기

`01-accent-color.html`에서는 브라우저가 기본 모양을 제공하는 입력 요소의 강조 색상을 바꿨습니다.

```css
.체크박스 {
  accent-color: lime;
}

.라디오버튼 {
  accent-color: orangered;
}

.크기조절바 {
  accent-color: gold;
}
```

`accent-color`는 다음과 같은 요소의 선택되거나 채워진 부분에 강조 색상을 적용해요.

- `input type="checkbox"`
- `input type="radio"`
- `input type="range"`
- `progress`

기본 모양은 유지하면서 서비스 색상만 간단하게 적용하고 싶을 때 편리합니다.

## 2. 체크박스로 토글 만들기

`02-toggle.html`에서는 체크박스의 기본 모양을 없애고 스위치 형태의 토글을 만들었습니다.

```css
.토글 {
  appearance: none;
  width: 40px;
  height: 24px;
  padding: 2px;
  background-color: lightgray;
  border-radius: 20px;
}
```

- `appearance: none`: 브라우저의 기본 체크박스 모양 제거
- `border-radius`: 바깥 상자를 둥글게 만들기
- `::after`: 토글 안에서 움직이는 원 만들기

```css
.토글::after {
  display: block;
  content: "";
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
```

`::after`는 HTML에 별도의 태그를 추가하지 않고도 요소의 마지막 부분에 가상의 요소를 만들 수 있어요. 가상 요소를 보이게 하려면 `content` 속성이 필요합니다.

## 3. :checked 상태에 따라 모양 바꾸기

체크박스가 선택된 상태는 `:checked` 가상 클래스로 찾을 수 있습니다.

```css
.토글:checked {
  background-color: limegreen;
}

.토글:checked::after {
  transform: translateX(calc(100% - 2px - 2px));
}
```

- `:checked`: 체크박스나 라디오 버튼이 선택된 상태
- `translateX()`: 가상 원을 가로 방향으로 이동
- `calc()`: 여러 크기 값을 계산
- `transition`: 이동 과정을 부드럽게 연결

자바스크립트 없이도 체크 여부에 따라 토글의 색상과 위치를 바꿀 수 있습니다.

## 4. 인접 형제 선택자로 드롭다운 열기

`03-dropdown.html`에서는 체크박스 바로 다음에 있는 목록을 열고 닫았습니다.

```css
.드롭다운제목:checked + ul {
  display: block;
}
```

`A + B`는 A 바로 다음에 있는 형제 B를 선택하는 **인접 형제 결합자**입니다.

1. 드롭다운 제목 체크박스가 선택돼요.
2. `:checked` 조건이 참이 돼요.
3. 바로 다음 형제인 `ul`의 `display`가 `block`으로 바뀌어요.

두 요소는 부모와 자식이 아니라 같은 부모 안의 형제이며, `ul`이 체크박스 바로 다음에 있어야 한다는 점이 중요해요.

## 5. label과 radio로 항목 선택하기

드롭다운 목록에서는 실제 라디오 버튼을 숨기고 `label`을 클릭할 수 있게 만들었습니다.

```html
<input type="radio" name="선택그룹" id="사과클릭" />
<label for="사과클릭">사과</label>
```

- `label`의 `for`와 input의 `id`를 같게 연결해요.
- label을 클릭해도 연결된 라디오 버튼이 선택돼요.
- 같은 `name`을 가진 라디오 버튼은 한 번에 하나만 선택할 수 있어요.

```css
.드롭다운목록 label:hover {
  background-color: gold;
}
```

`:hover`를 이용하면 마우스를 올린 항목도 알아보기 쉽게 표현할 수 있습니다.

## 6. CSS 변수로 선택한 값 보여주기

드롭다운 제목의 글자는 CSS 변수와 `content`를 이용해 보여줬습니다.

```css
.드롭다운제목 {
  --철수의CSS변수: "선택하세요~";
}

.드롭다운제목::after {
  content: var(--철수의CSS변수);
}
```

선택한 항목이 바뀌면 자바스크립트에서 CSS 변수의 값만 바꿔줍니다.

```js
const 선택가능 = (event) => {
  document.getElementById("드롭다운제목ID").style =
    `--철수의CSS변수: "${event.target.id}"`

  document.getElementById("드롭다운제목ID").click()
}
```

CSS 변수는 `--변수이름`으로 만들고 `var(--변수이름)`으로 사용합니다. 마지막의 `click()`은 제목 체크박스를 다시 눌러 목록을 닫아주는 역할이에요.

## 7. classList.toggle로 다크 모드 켜고 끄기

`04-dark.html`에서는 body에 다크 모드 클래스를 붙였다 떼는 방식으로 화면 색상을 바꿨습니다.

```js
const 다크모드기능 = () => {
  document.body.classList.toggle("다크모드만들기")
}
```

```css
.다크모드만들기 {
  color: white;
  background-color: black;
}
```

`classList.toggle()`은 클래스가 없으면 추가하고, 이미 있으면 제거해요. 다크 모드처럼 두 상태를 번갈아 전환할 때 잘 어울립니다.

## 8. 다크 모드 안의 태그 꾸미기

`05-dark-tag.html`에서는 body뿐 아니라 안쪽의 input, placeholder, button도 각각 다크 모드에 맞게 꾸몄습니다.

```css
.다크모드만들기 input {
  background-color: gray;
}

.다크모드만들기 input::placeholder {
  color: orange;
}

.다크모드만들기 button {
  color: blue;
  background-color: aqua;
}
```

`.다크모드만들기 input`은 다크 모드 클래스 안에 들어있는 모든 input을 선택하는 **하위 선택자**입니다. `::placeholder`는 입력창의 안내 문장을 꾸미는 가상 요소예요.

## 9. 전역 CSS 변수로 테마 관리하기

`06-dark-global.html`에서는 라이트 모드의 기본 색상을 `:root`에 변수로 만들고, 다크 모드에서는 변수의 값만 바꿨습니다.

```css
:root {
  --기본글자색: green;
  --기본배경색: white;
  --인풋배경색: white;
  --버튼배경색: lightgray;
}

.다크모드만들기 {
  --기본글자색: white;
  --기본배경색: black;
  --인풋배경색: gray;
  --버튼배경색: aqua;
}
```

각 태그는 직접 색상을 갖는 대신 변수를 사용합니다.

```css
body {
  color: var(--기본글자색);
  background-color: var(--기본배경색);
}

button {
  background-color: var(--버튼배경색);
}
```

이 방식은 테마가 바뀌어도 여러 선택자의 스타일을 하나씩 수정할 필요 없이 변수 값만 바꾸면 돼요. 색상 이름도 역할 중심으로 작성하면 어떤 곳에 사용하는 값인지 이해하기 쉽습니다.

## 오늘의 핵심

1. `accent-color`로 기본 입력 요소의 강조 색상을 바꿀 수 있어요.
2. `appearance: none`과 `::after`로 직접 토글 모양을 만들 수 있어요.
3. `:checked`는 체크된 입력 요소를 선택해요.
4. `A + B`는 A 바로 다음에 있는 형제 B를 선택해요.
5. `label`의 `for`와 input의 `id`를 연결하면 label로도 선택할 수 있어요.
6. `classList.toggle()`은 클래스를 추가했다가 제거해요.
7. CSS 변수를 사용하면 드롭다운 값과 다크 모드 색상을 편하게 관리할 수 있어요.

## 한번 해보기

- 체크박스, 라디오 버튼, range에 서로 다른 강조 색상을 적용해보세요.
- 토글이 켜졌을 때 배경색과 원의 색상이 모두 바뀌게 만들어보세요.
- 드롭다운에 새로운 과일 항목을 하나 추가해보세요.
- 라이트·다크 모드의 색상을 CSS 변수로 직접 정해서 나만의 테마를 만들어보세요!

오늘은 CSS 선택자와 상태가 실제 UI로 연결되는 과정을 배웠습니다. 화면이 원하는 대로 바뀌지 않으면 현재 태그의 상태, 선택자 사이의 관계, CSS 변수의 적용 범위를 하나씩 확인해보세요 ㅎㅎ
