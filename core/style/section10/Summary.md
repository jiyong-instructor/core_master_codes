# section10 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 CSS를 전부 직접 작성하는 방식에서 한 걸음 더 나아가, 이미 만들어진 디자인 시스템과 CSS 도구들을 사용해봤습니다. Bootstrap, Material Design, Tailwind CSS, Sass/SCSS, Emotion이 각각 어떤 방식으로 스타일을 만드는지도 비교했어요.

오늘 흐름은 이렇게 기억하면 좋아요.
**UI 라이브러리 가져오기 → 유틸리티 클래스로 조합하기 → Sass로 CSS 생성하기 → 자바스크립트 안에서 스타일 만들기**

## 1. Bootstrap으로 준비된 UI 사용하기

`01-bootstrap.html`에서는 CDN으로 Bootstrap의 CSS와 JavaScript를 불러와 버튼, 팝오버, 모달, 스피너를 사용했습니다.

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
```

Bootstrap은 미리 만들어진 클래스 이름을 HTML에 조합해서 UI를 빠르게 만들 수 있어요.

```html
<button class="btn btn-primary btn-lg">
  큰 기본 색상 버튼
</button>
```

- `btn`: 버튼의 기본 모양
- `btn-primary`: 주요 색상 적용
- `btn-lg`: 큰 버튼 크기
- `spinner-border`: 테두리가 회전하는 로딩 표시
- `text-success`, `text-danger`: 의미에 맞는 색상 적용

클래스만으로 동작하지 않는 팝오버나 모달 같은 컴포넌트는 Bootstrap JavaScript도 필요합니다.

```js
import * as bootstrap from "bootstrap"

new bootstrap.Popover(
  document.getElementById("popoverButton")
)
```

## 2. 접근성을 포함한 컴포넌트 구조

Bootstrap 스피너 안에는 화면에 보이지 않는 설명이 들어있습니다.

```html
<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
```

- `role="status"`: 현재 상태가 바뀌고 있음을 보조 기술에 알려줘요.
- `visually-hidden`: 화면에서는 숨기지만 스크린 리더에는 내용을 전달해요.

라이브러리에서 컴포넌트를 복사할 때는 보이는 모양뿐 아니라 `aria-label`, `role`, 숨겨진 설명처럼 접근성을 위한 코드도 함께 유지해주세요.

## 3. Material Design과 Web Components

`02-materil-design.html`에서는 Google의 Material Web 컴포넌트를 가져와 체크박스, 라디오 버튼, 입력창, 버튼을 만들었습니다.

```html
<md-checkbox></md-checkbox>

<md-radio name="group"></md-radio>

<md-outlined-text-field
  label="Favorite color"
  value="Purple"
></md-outlined-text-field>

<md-outlined-button type="reset">
  Reset
</md-outlined-button>
```

`md-checkbox`처럼 브라우저의 기본 HTML에는 없는 태그는 라이브러리가 등록한 **사용자 정의 요소**입니다. 필요한 모듈이 먼저 로드되어야 정상적인 디자인과 동작이 적용돼요.

Material 컴포넌트를 사용해도 일반 CSS로 주변 레이아웃을 꾸밀 수 있습니다.

```css
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
```

디자인 시스템은 모든 CSS를 대신하는 것이 아니라, 일관된 컴포넌트를 제공하고 우리가 필요한 레이아웃과 세부 스타일을 추가할 수 있게 도와주는 도구예요.

## 4. import map으로 모듈 주소 연결하기

Material과 Bootstrap 예제에서는 브라우저가 모듈 이름을 실제 CDN 주소로 찾을 수 있도록 import map을 사용했습니다.

```html
<script type="importmap">
{
  "imports": {
    "@material/web/": "https://esm.run/@material/web/"
  }
}
</script>
```

```js
import "@material/web/all.js"
```

import map은 `@material/web/`처럼 사람이 읽기 쉬운 이름과 실제 파일 주소를 연결해줘요. `type="module"`인 스크립트에서 `import` 문법을 사용할 수 있습니다.

## 5. Tailwind CSS와 유틸리티 클래스

`03-tailwind-css.html`에서는 하나의 역할만 담당하는 작은 클래스들을 조합해서 화면을 꾸몄습니다.

```html
<h1 class="text-3xl font-bold underline text-blue-500">
  Hello world!
</h1>
```

- `text-3xl`: 글자 크기
- `font-bold`: 굵은 글자
- `underline`: 밑줄
- `text-blue-500`: 파란 계열 글자색

Bootstrap이 완성된 버튼이나 모달 같은 컴포넌트를 제공한다면, Tailwind는 색상·간격·크기처럼 작은 유틸리티 클래스를 조합해 원하는 디자인을 직접 만드는 방식에 가까워요.

## 6. Tailwind 설정 확장하기

예제에서는 Tailwind 설정에 나만의 색상 이름을 추가했습니다.

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        철수가좋아하는색깔: "blue",
        영희가좋아하는색깔: "red"
      }
    }
  }
}
```

등록한 색상은 클래스 이름으로 사용할 수 있어요.

```html
<h1 class="text-철수가좋아하는색깔 bg-영희가좋아하는색깔">
  나만의 색상
</h1>
```

자주 반복되는 스타일은 `@layer utilities` 안에 사용자 정의 클래스로 추가할 수도 있습니다.

```css
@layer utilities {
  .훈이의CSS {
    color: green;
    font-size: 30px;
    font-weight: bold;
  }
}
```

## 7. Tailwind의 반응형 접두사

Tailwind에서는 `sm:`, `md:`, `lg:` 같은 접두사로 특정 화면 너비 이상에서 적용할 스타일을 정합니다.

```html
<h1 class="기본CSS sm:훈이의CSS">
  반응형 글자
</h1>
```

기본 설정에서 `sm:`은 작은 화면 전용이라는 뜻이 아니라 **sm breakpoint 이상부터 적용**한다는 의미예요. 작은 화면의 스타일을 접두사 없이 먼저 작성하고, 화면이 커질 때 바뀔 스타일에 접두사를 붙이는 모바일 우선 방식으로 생각하면 좋습니다.

CDN 방식은 설치 없이 빠르게 실습하기 좋고, 실제 프로젝트에서는 보통 빌드 도구를 이용해 사용하는 클래스에 맞는 CSS를 생성합니다.

## 8. Sass와 SCSS란?

CSS가 커지면 반복되는 스타일과 계산을 관리하기 어려워질 수 있습니다. Sass는 변수, 반복문, 조건문 같은 기능으로 CSS를 만들어주는 전처리 도구예요.

예제에는 두 가지 작성 문법이 있습니다.

### Sass 문법

`04-upgrade-css.sass`처럼 중괄호와 세미콜론 없이 들여쓰기로 구조를 표현합니다.

```sass
@for $i from 1 through 3
  .버튼-#{$i}
    width: 100px * $i

    @if $i == 3
      color: red
```

### SCSS 문법

`05-upgrade-css.scss`처럼 CSS와 비슷하게 중괄호와 세미콜론을 사용합니다.

```scss
@for $i from 1 through 3 {
  .버튼-#{$i} {
    width: 100px * $i;

    @if ($i == 3) {
      color: red;
    }
  }
}
```

두 문법 모두 Sass의 기능을 사용하며 최종적으로 브라우저가 읽을 수 있는 CSS로 변환해야 합니다.

## 9. 반복문과 조건문으로 CSS 생성하기

Sass 예제의 반복문은 버튼 클래스 3개를 자동으로 만듭니다.

```css
.버튼-1 { width: 100px; }
.버튼-2 { width: 200px; }
.버튼-3 {
  width: 300px;
  color: red;
}
```

- `@for`: 정해진 횟수만큼 반복
- `$i`: 현재 반복 번호를 담는 변수
- `#{$i}`: 변수 값을 선택자 이름 안에 삽입하는 보간법
- `@if`: 조건이 참일 때만 스타일 생성

`05-upgrade-css-ex.html`에서는 SCSS 파일을 가져와 브라우저에서 CSS로 변환한 뒤 `<style>` 태그에 넣었습니다.

```js
Sass.compile(SCSS소스코드, (CSS결과) => {
  document.getElementById("철수의스타일").innerText = CSS결과.text
})
```

이 방식은 변환 과정을 이해하기 좋은 수업 예제입니다. 실제 서비스에서는 사용자의 브라우저에서 매번 변환하기보다 개발·빌드 과정에서 SCSS를 CSS로 미리 변환하는 방식이 일반적이에요.

## 10. CSS-in-JS와 Emotion

`06-css-in-js-emotion.html`에서는 자바스크립트 안에서 CSS를 작성하고 Emotion이 생성한 클래스 이름을 버튼에 적용했습니다.

```js
const 지용이버튼 = emotion.css`
  width: 100px;
  height: 100px;
  background-color: coral;
`

document.getElementById("바디").innerHTML = `
  <button class="${지용이버튼}">지용이 버튼</button>
`
```

`emotion.css`는 작성한 스타일을 등록하고 생성된 클래스 이름을 반환합니다. 그 값을 HTML의 `class`에 넣으면 스타일이 적용돼요.

CSS-in-JS는 컴포넌트와 스타일을 가까운 곳에서 관리하고 자바스크립트 값에 따라 스타일을 바꾸기 편하다는 장점이 있습니다. 반대로 라이브러리 설정과 실행 비용, 팀의 작성 규칙도 함께 고려해야 해요.

## 스타일 도구 비교

| 도구 | 주된 방식 | 특징 |
| --- | --- | --- |
| Bootstrap | 준비된 컴포넌트 클래스 사용 | 빠르게 익숙한 UI를 만들기 좋아요. |
| Material Design | 디자인 시스템의 컴포넌트 사용 | 일관된 원칙과 사용자 정의 요소를 제공해요. |
| Tailwind CSS | 작은 유틸리티 클래스 조합 | HTML에서 세밀하게 디자인을 구성해요. |
| Sass/SCSS | 확장 문법을 CSS로 미리 변환 | 반복, 조건, 변수로 CSS 생성을 도와줘요. |
| Emotion | 자바스크립트에서 CSS 작성 | 컴포넌트와 동적인 스타일을 함께 관리해요. |

어떤 도구가 무조건 더 좋다기보다 프로젝트의 디자인 자유도, 개발 환경, 팀 경험, 유지보수 방법에 맞춰 선택하는 것이 중요합니다.

## 오늘의 핵심

1. Bootstrap과 Material은 준비된 UI와 디자인 규칙을 제공해요.
2. 동작이 있는 라이브러리 컴포넌트는 JavaScript 모듈도 필요할 수 있어요.
3. Tailwind는 작은 유틸리티 클래스를 조합해서 디자인해요.
4. Tailwind의 반응형 접두사는 해당 breakpoint 이상에서 적용돼요.
5. Sass와 SCSS는 확장 문법을 최종 CSS로 변환해서 사용해요.
6. Sass의 반복문과 조건문으로 반복 CSS를 자동 생성할 수 있어요.
7. Emotion은 자바스크립트에서 스타일을 등록하고 클래스 이름을 만들어요.

## 한번 해보기

- Bootstrap 버튼의 색상과 크기 클래스를 바꿔보세요.
- Material 입력창과 버튼을 하나씩 추가해 간단한 로그인 form을 만들어보세요.
- Tailwind로 모바일에서는 세로, 큰 화면에서는 가로인 카드 목록을 만들어보세요.
- Sass 반복문을 5번까지 늘려 너비가 100px씩 커지는 버튼을 만들어보세요.
- Emotion으로 마우스를 올렸을 때 색상이 바뀌는 버튼을 만들어보세요!

오늘은 같은 화면 스타일도 정말 다양한 방식으로 만들 수 있다는 것을 확인했습니다. 처음에는 도구 이름이 많아 보여도 괜찮아요. “완성된 UI를 가져오는가, 작은 클래스를 조합하는가, CSS를 생성하는가, JS 안에서 작성하는가”로 나누면 차이가 훨씬 잘 보입니다 ㅎㅎ
