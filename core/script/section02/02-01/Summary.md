# 02-01 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 브라우저에 데이터를 저장하는 방법과, 목록 페이지에서 상세 페이지로 값을 전달하는 방법을 배웠습니다.

오늘의 전체 흐름은 **데이터 저장하기 → 다시 꺼내기 → 주소에 값을 담아 페이지 이동하기 → 상세 페이지에서 값 꺼내기**입니다!

## 1. localStorage와 sessionStorage

`01-localstorage-sessionstorage.js`에서 브라우저 저장소를 사용해봤습니다.

```js
localStorage.setItem("아이디", 1234)
localStorage.getItem("아이디")

sessionStorage.setItem("비밀번호", 1234)
sessionStorage.getItem("비밀번호")
```

- `setItem(키, 값)`: 데이터 저장하기
- `getItem(키)`: 키를 이용해서 데이터 꺼내기
- `localStorage`: 브라우저를 닫았다 열어도 데이터가 남아있음
- `sessionStorage`: 현재 탭의 세션이 끝나면 데이터가 사라짐

저장소의 값은 기본적으로 문자열로 저장된다는 점도 기억해주세요.

## 2. 객체를 JSON으로 저장하기

`02-localstorage-with-json.js`에서는 과일 객체를 저장했습니다.

```js
const 과일담는통 = {
  사과: 5,
  바나나: 10,
  딸기: 10
}

localStorage.setItem("내과일들", JSON.stringify(과일담는통))
const 내과일들 = JSON.parse(localStorage.getItem("내과일들"))
```

- `JSON.stringify()`: 객체나 배열을 저장할 수 있는 문자열로 바꾸기
- `JSON.parse()`: JSON 문자열을 다시 객체나 배열로 바꾸기

객체를 그대로 저장하면 우리가 원하는 모습으로 보관되지 않습니다. 저장할 때는 `stringify`, 꺼낸 뒤 사용할 때는 `parse`를 한 세트로 생각하시면 됩니다.

## 3. 상대 경로로 페이지 이동하기

`routing1.html`에서는 `<a>` 태그로 상세 페이지에 이동했습니다.

```html
<a href="./routing2_detail.html?my-number=1">상세일기1</a>
```

`./`는 현재 파일과 같은 위치를 의미하는 상대 경로입니다. `?` 뒤의 `my-number=1`은 다음 페이지에 전달할 값인 쿼리스트링입니다.

## 4. 쿼리스트링 꺼내기

`routing2_detail.html`에서는 주소에 들어있는 일기 번호를 꺼냈습니다.

```js
const 쿼리스트링 = location.search
const 잘게나누어담은통 = new URLSearchParams(쿼리스트링)
const 일기번호상자 = 잘게나누어담은통.get("my-number")
```

- `location.search`: 현재 주소의 `?`부터 뒤쪽 내용을 가져오기
- `URLSearchParams`: 쿼리스트링을 다루기 편한 형태로 바꾸기
- `.get("키")`: 원하는 키의 값 꺼내기

## 오늘의 핵심

1. 브라우저 저장소에는 키와 값의 형태로 데이터를 저장합니다.
2. 객체와 배열은 `JSON.stringify()`로 변환해서 저장합니다.
3. 저장한 JSON 문자열은 `JSON.parse()`로 원래 모습에 가깝게 되돌립니다.
4. 주소의 `?키=값`을 이용하면 다음 페이지에 값을 전달할 수 있습니다.
5. 전달받은 값은 `URLSearchParams`의 `get()`으로 꺼낼 수 있습니다.

## 한번 해보기

- 내 이름과 좋아하는 음식을 객체로 만들어 localStorage에 저장해보세요.
- 저장한 값을 다시 꺼내 콘솔에 출력해보세요.
- 목록에 상세 페이지 링크를 하나 추가하고, 주소로 다른 번호를 전달해보세요!

저장소와 페이지 이동은 앞으로 목록·상세 화면을 만들 때 계속 사용하게 됩니다. 저장할 때와 꺼낼 때 데이터가 어떤 형태인지 꼭 콘솔에서 확인해주세요!
