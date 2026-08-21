# day04 오늘 배운 내용 정리

안녕하세요 여러분! 오늘은 주소에 따라 화면을 바꾸는 SPA 라우팅과 JavaScript에 타입을 더하는 TypeScript를 배웠습니다. TypeScript는 단순히 `string` 하나 붙이는 문법이 아니라 배열, 객체, 함수, React state와 event까지 데이터의 모양을 설명하는 도구예요.

오늘 흐름은 이렇게 기억하면 좋아요.  
**주소와 화면 연결하기 → 기본 타입 붙이기 → 배열과 객체 표현하기 → 함수 입출력 검사하기 → React 타입 연결하기 → ESLint·Prettier 구분하기**

## 1. SPA 라우팅

`RouterExample.tsx`에서는 주소와 컴포넌트를 연결했습니다.

```tsx
<Route path=\"/\" element={<ProductListPage />} />
<Route path=\"/products/:productId\" element={<ProductDetailPage />} />
```

`productId` 앞의 `:`는 상품마다 달라지는 동적 값을 의미해요. `useParams()`로 현재 주소의 값을 읽을 수 있습니다.

React Router의 `Link`는 필요한 컴포넌트를 바꾸는 SPA 이동이고, 일반 `<a>`는 문서를 다시 요청할 수 있다는 차이가 있어요.

## 2. 타입 추론과 타입 명시

TypeScript는 오른쪽 값을 보고 타입을 추론할 수 있습니다.

```ts
let courseName = \"Main Course\" // string으로 추론
let studentCount: number = 12  // number라고 명시
```

값만 보고 정확히 알 수 있다면 모든 변수에 타입을 반복해서 적을 필요는 없어요. 함수의 매개변수, 비어 있는 state, 외부 데이터처럼 모양을 분명히 알려줘야 하는 곳에 타입 명시가 특히 중요합니다.

## 3. 원시 타입

`typescript/01-primitive-types.ts`에서 다음 타입을 확인했습니다.

- `string`: 문자열
- `number`: 숫자
- `boolean`: 참과 거짓
- `null`: 값이 의도적으로 비어 있음
- `undefined`: 값이 아직 정해지지 않음

문자열처럼 보이는 `\"1000\"`과 숫자 `1000`은 다른 타입이에요.

## 4. 배열, union, tuple

`typescript/02-array-tuple.ts`에서는 배열 안의 값 타입을 적었습니다.

```ts
const cities: string[] = [\"서울\", \"제주\"]
const ids: (string | number)[] = [1, \"special-2\"]
const coordinate: [number, number] = [33.4, 126.5]
```

- `string[]`: 모든 항목이 문자열인 배열
- `string | number`: 문자열 또는 숫자
- tuple: 위치별 타입과 배열 길이가 정해짐

## 5. 객체와 interface

`typescript/03-object-interface.ts`에서는 여행상품 객체의 모양을 만들었습니다.

```ts
interface TravelProduct {
  id: string
  name: string
  price: number
  description?: string
}
```

`?`가 붙은 property는 선택 값입니다. 객체에 없어도 타입 오류가 나지 않아요. API 데이터에 실제로 없을 수 있는 값인지 확인한 뒤 선택 타입을 사용해주세요.

## 6. union 타입 좁히기

`typescript/04-union-narrowing.ts`처럼 값이 여러 타입일 수 있다면 현재 타입을 확인한 뒤 각 타입의 기능을 사용해요.

```ts
if (typeof productId === \"string\") {
  productId.toUpperCase()
}
```

이 과정을 type narrowing이라고 합니다. 문자열에만 있는 함수와 숫자에만 있는 함수는 타입을 좁힌 뒤 사용할 수 있어요.

## 7. 함수 타입

함수는 여러 곳에서 다양한 값으로 호출되므로 매개변수 타입을 명확히 적는 것이 중요해요.

```ts
function calculateTotal(price: number, count: number): number {
  return price * count
}
```

괄호 뒤의 `: number`는 return 타입입니다. return 타입은 추론할 수 있지만 함수가 무엇을 돌려줘야 하는지 약속을 분명히 보여주고 싶을 때 적을 수 있어요.

## 8. type과 interface

둘 다 객체의 모양을 표현할 수 있습니다.

```ts
type Status = \"ready\" | \"loading\" | \"success\" | \"error\"

interface User {
  id: string
  name: string
}
```

- union이나 함수 타입도 함께 표현하고 싶다면 `type`이 편해요.
- 객체 구조를 확장하거나 라이브러리 타입과 합칠 때 `interface`가 편한 경우가 있어요.
- 팀의 규칙에 맞춰 일관되게 사용하는 것이 더 중요해요.

## 9. generic의 첫 이해

`typescript/07-generic.ts`의 `ApiResponse<Data>`는 응답 안의 실제 데이터 모양을 사용하는 시점에 정합니다.

```ts
type ApiResponse<Data> = {
  data: Data
  message: string
}
```

Apollo Codegen의 생성 타입을 읽다 보면 generic을 자주 만나지만, 오늘은 “타입을 받는 빈칸” 정도로 이해하면 충분해요.

## 10. React state와 event 타입

```tsx
const [formData, setFormData] = useState<FormData>({
  title: \"\",
  price: 0,
})
```

input event는 `ChangeEvent<HTMLInputElement>`, button click은 `MouseEvent<HTMLButtonElement>`처럼 어떤 element의 event인지 적어줘요.

```tsx
function handleChange(event: ChangeEvent<HTMLInputElement>) {
  setTitle(event.target.value)
}
```

## 11. any는 왜 조심할까요?

`any`는 TypeScript 검사를 사실상 끄는 타입입니다. 급하게 오류를 없애기 위해 모든 값을 `any`로 바꾸면 TypeScript를 사용하는 장점이 사라져요.

모르는 데이터라면 `unknown`으로 받고 타입을 확인하거나, 실제 API 응답의 모양을 type/interface로 작성하는 편이 안전합니다.

## 12. ESLint와 Prettier

- TypeScript: 값의 타입 문제를 검사
- ESLint: 사용하지 않는 변수나 잘못된 코드 규칙을 검사
- Prettier: 따옴표, 줄바꿈, 들여쓰기 같은 코드 모양을 정리

세 도구는 역할이 다르므로 하나가 다른 도구를 완전히 대신하지 않아요.

| 도구 | 확인하는 질문 | 고쳐야 하는 사람 |
|---|---|---|
| TypeScript | 이 값의 타입이 맞나요? | 개발자 |
| ESLint | 실수하기 쉬운 코드나 규칙 위반이 있나요? | 개발자 또는 자동 수정 |
| Prettier | 코드 모양을 어떻게 통일할까요? | 대부분 자동 정리 |

## 13. TypeScript 오류와 ESLint 경고 구분하기

TypeScript는 값의 종류가 약속과 다를 때 알려줍니다.

~~~ts
const price: number = "10000"
~~~

위 코드는 number 자리에 string을 넣었기 때문에 타입 오류가 발생해요.
Prettier로 정리해도 타입 오류는 없어지지 않습니다.

ESLint는 실행은 될 수 있지만 실수로 이어지기 쉬운 코드를 알려줄 수 있어요.

~~~ts
const unusedProductName = "제주 여행"
~~~

변수를 만들고 한 번도 사용하지 않았다면 ESLint가 경고할 수 있습니다.
프로젝트 규칙에 따라 경고의 종류와 강도는 달라질 수 있어요.

빨간 줄이나 노란 줄이 보이면 바로 지우려고 하기 전에
TypeScript 문제인지 ESLint 문제인지 메시지의 출처와 첫 문장을 먼저 읽어보세요.

## 14. Prettier는 코드 모양을 정리해요

아래 코드는 실행할 수 있지만 사람이 읽기 불편합니다.

~~~ts
const product={name:"제주 여행",price:10000}
~~~

Prettier로 정리하면 일정한 띄어쓰기와 줄바꿈이 적용됩니다.

~~~ts
const product = {
  name: "제주 여행",
  price: 10000,
}
~~~

Prettier는 변수의 값이 올바른지 판단하지 않습니다.
오직 코드 모양을 팀에서 정한 형태로 통일해줍니다.

## 15. VS Code에서 코드 정리하기

파일 하나를 정리할 때는 VS Code의 Format Document를 사용할 수 있어요.

- macOS: Shift + Option + F
- 명령 팔레트에서 Format Document 검색
- 기본 Formatter를 Prettier로 선택
- 저장 시 자동 정렬을 켜면 저장할 때마다 모양이 정리됨

저장할 때 자동 정렬되는 모습을 먼저 확인하고,
설정 파일의 모든 옵션을 외우지는 않습니다.

## 16. 명령어로 전체 파일 확인하기

프로젝트의 package.json에 lint script가 준비되어 있다면 실행해봅니다.

~~~bash
npm run lint
~~~

Prettier가 바꿀 파일이 있는지만 확인할 수도 있습니다.

~~~bash
npx prettier . --check
~~~

실제로 파일을 정리할 때는 아래 명령을 사용할 수 있어요.

~~~bash
npx prettier . --write
~~~

--check는 파일을 바꾸지 않고 확인만 하고,
--write는 파일을 실제로 정리합니다.

수업에서는 명령어를 외우는 것보다 아래 순서를 익히는 것이 중요해요.

1. 오류 메시지의 출처 확인하기
2. TypeScript 오류라면 타입과 값을 비교하기
3. ESLint 경고라면 사용하지 않는 코드나 규칙 확인하기
4. 코드 모양이 흐트러졌다면 Prettier 실행하기
5. 마지막에 lint 명령으로 전체 확인하기

## 오늘의 핵심

1. route는 주소와 화면을 연결해요.
2. TypeScript는 실행 전에 잘못된 데이터 모양을 찾도록 도와줘요.
3. 배열은 `string[]`, 객체는 type/interface로 표현할 수 있어요.
4. union은 여러 타입 중 하나를 허용해요.
5. 함수의 매개변수와 return에도 타입을 붙여요.
6. React state가 빈 배열이나 객체라면 타입 명시가 중요해요.
7. event에는 element 종류에 맞는 event 타입을 사용해요.
8. `any`로 오류를 덮기보다 실제 데이터 타입을 찾아요.
9. TypeScript, ESLint, Prettier는 서로 다른 문제를 해결해요.
10. Prettier는 타입 오류를 고치지 않고 코드 모양만 정리해요.
11. 오류 표시가 보이면 메시지의 출처와 첫 문장을 먼저 읽어요.

## 한번 해보기

- `TravelProduct`에 `tags: string[]`를 추가해보세요.
- 예약 상태를 세 문자열만 허용하는 union으로 만들어보세요.
- 상품 배열 `TravelProduct[]`를 만들고 `map()`으로 이름을 출력해보세요.
- 숫자 input 값을 `Number()`로 바꿔 state에 저장해보세요.
- 함수 매개변수에 잘못된 타입을 넣어 TypeScript 오류를 읽어보세요.
- 사용하지 않는 변수를 만들고 ESLint 메시지를 확인해보세요.
- 일부러 들여쓰기를 흐트러뜨린 뒤 Format Document를 실행해보세요.
- npm run lint를 실행하고 출력된 파일 이름과 줄 번호를 찾아보세요.

TypeScript 오류는 실패가 아니라 “이 값이 우리가 약속한 모양과 다르다”는 안내입니다. 빨간 줄을 지우는 것보다 오류 문장이 어떤 값과 어떤 타입을 비교하는지 천천히 읽어보세요 ㅎㅎ
