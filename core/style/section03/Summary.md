# section03 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 CSS의 `position`과 스크롤 관련 속성을 배웠습니다.
이번 파트는 "요소를 어디에 둘지"를 정하는 감각을 잡는 게 핵심이에요.

오늘 흐름은 이렇게 기억하면 좋아요.
**position 종류 이해하기 -> 스크롤 박스 만들기 -> sticky로 고정 헤더 만들기**

## 1. absolute: 기준점에서 딱 원하는 좌표로 배치

`01-position-absolute.html`에서는 박스를 절대 위치로 배치했습니다.

```css
.네모상자 {
  position: absolute;
  top: 100px;
  left: 300px;
}
```

- `absolute`는 좌표(`top`, `left`, `right`, `bottom`)로 위치를 정해요.
- 문서 흐름에서 빠져나오기 때문에, 주변 요소 배치와 별개로 떠 있는 느낌을 만들 수 있어요.

## 2. relative: 원래 자리 기준으로 살짝 이동

`02-position-relative.html`에서는 삭제 버튼을 카드 위로 올리는 느낌을 만들었습니다.

```css
.삭제버튼 {
  position: relative;
  top: -300px;
  left: 180px;
}
```

- `relative`는 "내 원래 자리"를 기준으로 움직여요.
- 요소는 흐름에 남아있고, 보이는 위치만 이동합니다.

작은 뱃지나 버튼 위치를 미세 조정할 때 자주 사용해요.

## 3. fixed: 화면에 붙여두기

`03-position-fixed.html`에서는 플로팅 버튼을 만들었습니다.

```css
.floating_button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
```

- `fixed`는 스크롤해도 화면 기준 위치가 유지돼요.
- 챗봇 버튼, 맨 위로 버튼처럼 항상 보여야 하는 UI에 좋아요.

## 4. 스크롤 박스 만들기 (세로)

`04-scroll-y.html`에서는 부모 박스 안에서 스크롤이 생기게 만들었습니다.

```css
.Parent {
  width: 200px;
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;
}
```

- 부모 크기보다 내용이 커지면 스크롤이 생겨요.
- `overflow-x: hidden`으로 가로 스크롤은 숨기고, 세로만 사용하도록 했어요.

## 5. 가로/세로 스크롤과 flex-shrink

`05-scroll-x.html`에서는 여러 카드를 가로로 나열하는 구조를 만들었습니다.

```css
.Parent {
  display: flex;
  flex-direction: row;
}

.Child {
  flex-shrink: 0;
}
```

- `flex-shrink: 0`을 주면 자식이 찌그러지지 않아요.
- 카드형 리스트에서 요소 크기를 유지하고 스크롤로 넘기고 싶을 때 중요해요.

## 6. sticky: 스크롤 중 상단에 붙는 헤더

`06-scroll-sticky.html`에서는 스크롤 컨테이너 안에서 헤더를 상단에 고정했습니다.

```css
.sticky_header {
  position: sticky;
  top: 0;
}
```

- `sticky`는 평소에는 일반 요소처럼 있다가,
  지정한 위치(`top: 0`)에 닿으면 붙어서 유지돼요.
- 섹션 제목 고정, 목록 헤더 고정에 매우 유용해요.

## 오늘의 핵심

1. `absolute`는 좌표 기준으로 배치하고 문서 흐름에서 빠져요.
2. `relative`는 원래 자리 기준으로 이동해요.
3. `fixed`는 화면에 고정돼서 스크롤해도 같은 자리에 있어요.
4. `overflow`로 스크롤 방향을 제어할 수 있어요.
5. `flex-shrink: 0`은 카드 크기 유지에 자주 필요해요.
6. `sticky`는 스크롤 구간에서 붙는 헤더를 만들 때 사용해요.

## 한번 해보기

- 우측 하단 `fixed` 버튼을 만들고 hover 색상도 추가해보세요.
- 긴 목록 박스를 만들고 `sticky`로 제목을 고정해보세요.
- 카드 리스트에서 `flex-shrink: 0`을 지웠다가 다시 넣어서 차이를 확인해보세요.

오늘 배운 포지션과 스크롤은 레이아웃에서 정말 자주 만나는 기본기입니다.
속성 하나씩 바꿔보면서 "왜 이렇게 보이는지" 확인하면 실력이 빠르게 올라가요!
