# section05 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 요소들이 겹쳤을 때 앞뒤 순서를 정하는 `z-index`부터, 이미지 위에 버튼을 올리는 오버레이와 실제 화면에서 자주 사용하는 모달까지 만들어봤어요.

오늘 흐름은 이렇게 기억하면 좋습니다.
**겹치는 순서 이해하기 → 기준이 되는 부모 만들기 → 화면을 덮는 배경 만들기 → 모달 열고 닫기**

## 1. z-index로 앞뒤 순서 정하기

`01-z-index.html`에서는 여러 색상의 박스를 겹치고, 어떤 박스가 위에 보일지 정했습니다.

```css
.yellow-paper {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 3;
}

.blue-paper {
  position: absolute;
  top: 60px;
  left: 60px;
  z-index: 2;
}
```

- `z-index`는 요소가 겹쳤을 때 쌓이는 순서를 정해요.
- 같은 쌓임 맥락 안에서는 값이 큰 요소가 더 위에 보여요.
- `z-index`를 비교하려면 요소가 어떤 쌓임 맥락에 들어있는지도 함께 확인해야 해요.

숫자를 무조건 아주 크게 만드는 것보다 `배경 10`, `모달 20`, `알림 30`처럼 역할별 기준을 정해두면 관리하기 편합니다.

## 2. 쌓임 맥락 이해하기

`02-stacking-context.html`에서는 `position`과 `z-index`를 함께 사용해 박스의 순서를 바꿔봤습니다.

```css
.red-paper {
  position: absolute;
  z-index: 777;
}
```

쌓임 맥락은 요소들의 앞뒤 순서를 비교하는 하나의 그룹이라고 생각하면 좋아요. 자식의 `z-index` 값이 아주 크더라도, 부모가 다른 쌓임 맥락 아래에 있다면 바깥 요소보다 위로 올라오지 못할 수 있습니다.

`position`이 적용된 요소에 `z-index` 값을 주는 방식이 가장 자주 보이지만, `fixed`, `sticky`, `transform`, `opacity` 같은 속성도 조건에 따라 새로운 쌓임 맥락을 만들 수 있어요.

## 3. 부모를 기준으로 오버레이하기

`03-overlay-refactoring.html`에서는 삭제 버튼을 이미지 위에 올렸습니다.

```css
.image-container {
  position: relative;
}

.delete-button {
  position: absolute;
  top: 0;
  left: 190px;
}
```

- 부모의 `position: relative`: 자식이 위치를 잡을 기준 만들기
- 자식의 `position: absolute`: 부모를 기준으로 원하는 좌표에 배치하기

버튼을 원래 위치에서 음수 값으로 억지로 끌어올리는 것보다, 기준 부모를 만들고 `absolute`로 배치하는 편이 구조를 이해하고 수정하기 쉬워요.

CSS의 `.image-container`와 HTML의 `class="image-container"`처럼 클래스 이름은 정확히 같아야 스타일이 연결된다는 점도 꼭 확인해주세요!

## 4. 화면 전체를 덮는 모달 배경

`04-modal-background.html`에서는 처음에는 숨겨져 있다가 버튼을 누르면 나타나는 모달 배경을 만들었습니다.

```css
.모달배경 {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.9;
}
```

- `display: none`: 화면에서 숨기기
- `display: block`: 화면에 다시 보여주기
- `100vw`: 현재 화면 너비의 100%
- `100vh`: 현재 화면 높이의 100%
- `opacity`: 요소의 투명도 조절

자바스크립트에서는 버튼을 눌렀을 때 요소의 인라인 스타일을 바꿔 배경을 보여줬습니다.

```js
const 모달열기 = () => {
  document.getElementById("모달배경ID").style.display = "block"
}
```

## 5. 화면 가운데 모달 만들기

`05-modal.html`에서는 배경 위에 실제 모달 상자를 올리고, 열기와 닫기 기능을 만들었습니다.

```css
.모달 {
  position: absolute;
  top: calc(50% - 500px / 2);
  left: calc(50% - 400px / 2);
  width: 400px;
  height: 500px;
}
```

화면의 `50%` 위치에서 모달 크기의 절반을 빼면 모달의 가운데를 화면 가운데에 맞출 수 있어요. `calc()`는 서로 다른 값과 단위를 계산할 때 사용합니다.

```js
const 모달열기 = () => {
  document.getElementById("모달그룹ID").style.display = "block"
}

const 모달닫기 = () => {
  document.getElementById("모달그룹ID").style.display = "none"
}
```

모달 배경과 모달 상자를 하나의 그룹으로 묶으면 두 요소를 한 번에 열고 닫을 수 있습니다.

## 6. 여러 종류의 모달 제어하기

`06-modal-nesting.html`에서는 등록 모달과 등록 완료 모달처럼 여러 모달을 다루는 방법을 살펴봤습니다.

```js
const 모달열기 = (모달종류) => {
  document.getElementById(모달종류).style.display = "block"
}

const 모달닫기 = (모달종류) => {
  document.getElementById(모달종류).style.display = "none"
}
```

함수에 모달의 ID를 인자로 전달하면 모달마다 함수를 따로 만들지 않고 하나의 함수로 여러 모달을 제어할 수 있어요.

```html
<div class="모달배경" onclick="모달닫기('등록모달그룹ID')"></div>
```

배경을 클릭했을 때 현재 모달을 닫도록 연결할 수도 있습니다. 여러 모달을 만들 때는 각 그룹에 `등록모달그룹ID`, `등록완료모달그룹ID`처럼 **서로 다른 ID**를 사용해야 원하는 요소를 정확히 찾을 수 있어요.

## 오늘의 핵심

1. `z-index`는 요소가 겹쳤을 때 보이는 앞뒤 순서를 정해요.
2. `z-index` 값뿐 아니라 부모와 쌓임 맥락도 함께 확인해야 해요.
3. 부모에 `relative`, 자식에 `absolute`를 사용하면 부모 기준으로 오버레이할 수 있어요.
4. `100vw`, `100vh`를 사용하면 화면 전체를 덮는 배경을 만들 수 있어요.
5. `display: none`과 `display: block`으로 모달을 숨기고 보여줄 수 있어요.
6. 모달 ID를 함수의 인자로 전달하면 여러 모달을 하나의 함수로 관리할 수 있어요.

## 한번 해보기

- 색상 박스 3개를 겹치고 `z-index` 값을 바꿔가며 순서를 확인해보세요.
- 이미지 오른쪽 위에 삭제 버튼을 올려보세요.
- 모달 배경을 클릭하면 모달이 닫히도록 만들어보세요.
- 등록 버튼을 누르면 등록 모달은 닫히고 완료 모달이 열리도록 연결해보세요!

오늘 배운 내용은 모달뿐 아니라 뱃지, 드롭다운, 툴팁처럼 화면 위에 겹쳐 보이는 UI의 기본이 됩니다. 위치가 예상과 다르다면 `position`의 기준 부모와 쌓임 맥락부터 차근차근 확인해보세요!
