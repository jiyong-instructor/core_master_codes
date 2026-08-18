# 02-02 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 CSS 애니메이션을 실제 화면에서 자주 만나는 UI에 적용해봤습니다. 토스트 메시지, 로딩 표시, 스켈레톤 화면까지 만들어봤습니다.

모양은 서로 다르지만 모두 **기본 스타일을 만든 뒤 `@keyframes`로 변화 과정을 작성한다**는 흐름은 같습니다!

## 1. 토스트 메시지

`01-toast.html`에서는 잠깐 나타나서 사용자에게 결과를 알려주는 토스트 UI를 만들었습니다.

```css
.토스트 {
  border-radius: 15px;
  animation-name: 토스트애니메이션;
  animation-duration: 3s;
}

@keyframes 토스트애니메이션 {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

`opacity`는 투명도를 의미합니다. `0`은 완전히 투명하고, `1`은 완전히 보이는 상태입니다.

## 2. 로딩 표시

`02-loading.html`에서는 원의 위쪽 테두리 색상을 다르게 만든 뒤 계속 회전시켜 로딩 UI를 만들었습니다.

```css
.loading {
  border: 7px solid yellow;
  border-top-color: coral;
  border-radius: 100%;
  animation-iteration-count: infinite;
}

@keyframes 로딩애니메이션 {
  to { transform: rotateZ(360deg); }
}
```

모든 테두리 색상이 같으면 회전하는 모습이 잘 보이지 않습니다. 한쪽 색상을 다르게 해야 움직임을 눈으로 확인할 수 있습니다.

## 3. 스켈레톤 화면

`03-skeleton.html`에서는 실제 내용이 나타나기 전에 로딩 중임을 보여주는 스켈레톤 UI를 만들었습니다.

```css
.스켈레톤막대기 {
  filter: blur(40px);
  animation-iteration-count: infinite;
}

@keyframes 스켈레톤애니메이션 {
  from { transform: translate(-400px, -400px) rotateZ(30deg); }
  to   { transform: translate(700px, 200px) rotateZ(30deg); }
}
```

- `translate(x, y)`: 요소의 위치를 이동
- `rotateZ()`: 요소를 회전
- `blur()`: 요소를 흐리게 표현

여러 transform 함수를 한 줄에 이어서 작성하면 이동과 회전을 함께 적용할 수 있습니다.

## 오늘의 핵심

1. 투명도 변화는 `opacity`를 사용합니다.
2. 둥근 원은 `border-radius`로 만들 수 있습니다.
3. 반복되는 로딩 UI에는 `animation-iteration-count: infinite`를 사용합니다.
4. `translate`, `rotate`, `blur`를 조합하면 스켈레톤의 빛나는 효과를 만들 수 있습니다.
5. 서로 다른 UI도 `기본 모양 → keyframes → animation 적용` 순서로 만들면 됩니다.

## 한번 해보기

- 토스트가 나타났다가 다시 사라지도록 중간 단계를 추가해보세요.
- 로딩 원의 크기, 테두리 색상, 회전 속도를 바꿔보세요.
- 스켈레톤 막대기의 이동 방향을 반대로 바꿔보세요!

오늘 만든 세 가지 UI는 실제 서비스에서도 정말 자주 사용합니다. 속성값을 조금씩 바꿔보면서 나만의 로딩 화면을 만들어보세요!
