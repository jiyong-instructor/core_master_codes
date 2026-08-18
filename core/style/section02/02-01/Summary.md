# 02-01 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 화면에 움직임을 더해주는 `transition`, `transform`, `animation`을 배웠습니다.

세 가지 이름이 비슷하게 느껴질 수 있지만 역할은 조금씩 다릅니다. **모양을 바꾸는 것은 `transform`, 변화를 부드럽게 이어주는 것은 `transition`, 여러 단계의 움직임을 만드는 것은 `animation`**이라고 생각하시면 됩니다!

## 1. transition

`01-transition.html`에서는 마우스를 올렸을 때 박스의 크기와 색상이 부드럽게 변하도록 만들었습니다.

```css
.box {
  transition:
    width 0.9s,
    height 0.9s,
    background-color 0.9s;
}

.box:hover {
  width: 500px;
  height: 500px;
  background-color: lightcoral;
}
```

`:hover`는 마우스를 요소 위에 올린 상태를 의미합니다. `transition`에는 어떤 속성을 몇 초 동안 변화시킬지 작성합니다.

## 2. transform

`02-transform1.html`에서는 요소를 비틀고, 확대하고, 회전시켜봤습니다.

- `skewX(30deg)`: X축 방향으로 비틀기
- `scaleX(1.5)`: X축 방향으로 1.5배 확대
- `rotateX(180deg)`: X축을 기준으로 회전
- `rotateY(180deg)`: Y축을 기준으로 회전
- `rotateZ(35deg)`: 화면에서 보이는 평면을 기준으로 회전

`deg`는 회전 각도를 나타내는 단위입니다.

## 3. transform과 transition 함께 사용하기

`03-transfrom-with-transition.html`에서는 두 속성을 함께 사용했습니다.

```css
.box {
  transition: transform 1s, background-color 1s;
}

.box:hover {
  transform: rotate(180deg);
  background-color: red;
}
```

`transform`만 사용하면 바로 회전하지만, `transition`을 함께 사용하면 1초 동안 부드럽게 회전합니다.

## 4. animation과 keyframes

`04-animation.html`에서는 회전과 색상 변화를 여러 단계로 나눠서 반복했습니다.

```css
.box:hover {
  animation-name: 인피니티애니메이션;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
}

@keyframes 인피니티애니메이션 {
  from { transform: rotate(0deg); }
  50%  { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}
```

- `animation-name`: 실행할 keyframes의 이름
- `animation-duration`: 한 번 실행되는 시간
- `animation-iteration-count`: 반복 횟수
- `infinite`: 계속 반복
- `from`, `to`, `%`: 움직임의 단계

## 오늘의 핵심

1. `transition`은 상태가 바뀌는 과정을 부드럽게 만듭니다.
2. `transform`으로 이동, 확대·축소, 회전, 비틀기를 할 수 있습니다.
3. 복잡하거나 반복되는 움직임은 `@keyframes`와 `animation`으로 만듭니다.
4. 애니메이션 이름은 `animation-name`과 `@keyframes`에서 똑같이 작성해야 합니다.

## 한번 해보기

- 버튼에 마우스를 올리면 1.2배 커지게 만들어보세요.
- 박스가 한 바퀴 회전하면서 색상이 바뀌게 만들어보세요.
- `animation-duration`을 바꿔서 움직임의 빠르기를 비교해보세요!

움직임은 너무 많으면 화면이 정신없어질 수 있습니다. 필요한 부분에 살짝 사용하면 훨씬 자연스럽고 재미있는 화면을 만들 수 있습니다!
