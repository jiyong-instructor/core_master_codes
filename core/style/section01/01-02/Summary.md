# 01-02 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 여러 요소를 가로 또는 세로로 정렬할 수 있는 **Flexbox**를 배웠습니다.

Flexbox는 부모가 자식들을 어떻게 배치할지 정하는 방식입니다. 그래서 가장 먼저 **부모 요소에 `display: flex`를 작성한다**는 점을 기억해주세요!

## 1. Flexbox 시작하기

`01-flexbox.html`에서 부모 요소에 Flexbox를 적용해봤습니다.

```css
.부모 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
```

- `display: flex`: 자식들을 Flexbox 방식으로 배치
- `flex-direction`: 자식들이 나열되는 방향 지정
- `justify-content`: 주축 방향으로 정렬
- `align-items`: 교차축 방향으로 정렬
- `gap`: 자식 사이의 간격 지정

## 2. 주축과 교차축

Flexbox에서는 가로와 세로를 무조건 외우기보다 **주축과 교차축**으로 생각하는 것이 중요합니다.

- `flex-direction: row`: 주축이 가로, 교차축이 세로
- `flex-direction: column`: 주축이 세로, 교차축이 가로

따라서 `flex-direction`이 바뀌면 `justify-content`와 `align-items`가 정렬하는 방향도 함께 바뀝니다.

## 3. 줄바꿈하기

`02-flex-wrap.html`에서는 자식들이 부모의 너비보다 많아졌을 때 줄을 바꿔주는 방법을 확인했습니다.

```css
.부모 {
  display: flex;
  flex-wrap: wrap;
}
```

기본값은 `nowrap`이라서 자식들이 한 줄에 계속 배치됩니다. `wrap`을 사용하면 공간이 부족할 때 다음 줄로 자연스럽게 내려갑니다.

## 4. 화면의 한가운데 정렬하기

`03-flexbox-column.html`에서는 화면 높이 전체를 사용하고, 자식들을 가운데에 정렬해봤습니다.

```css
body {
  height: 100vh;
  margin: 0;
}

.부모 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
```

`100vh`는 현재 브라우저 화면 높이의 100%를 의미합니다.

## 오늘의 핵심

1. Flexbox는 부모에게 `display: flex`를 적용합니다.
2. `flex-direction`이 주축의 방향을 결정합니다.
3. `justify-content`는 주축, `align-items`는 교차축을 정렬합니다.
4. 공간이 부족할 때 줄바꿈하려면 `flex-wrap: wrap`을 사용합니다.
5. 요소 사이의 간격은 `gap`으로 편하게 만들 수 있습니다.

## 한번 해보기

- 메뉴 3개를 가로로 나란히 배치해보세요.
- 메뉴 사이에 `16px` 간격을 넣어보세요.
- `flex-direction`을 `column`으로 바꾸고 정렬 방향이 어떻게 달라지는지 확인해보세요.
- 박스를 화면의 정가운데에 배치해보세요!

Flexbox는 직접 속성을 하나씩 바꿔보는 것이 제일 빠릅니다. 주축이 어느 방향인지 먼저 찾으면 정렬이 훨씬 쉬워집니다!
