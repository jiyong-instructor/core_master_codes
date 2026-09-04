# Day 12 오늘 배운 내용 정리

안녕하세요! 오늘은 과제용 API로 **등록, 수정, 이미지 업로드, 주소와 좌표 저장**을 연결합니다.

## 오늘의 전체 흐름

```text
입력값 state에 저장
  → 이미지 여러 장 업로드
  → 주소 검색과 위도·경도 입력
  → 모든 값을 mutation variables로 보내기
  → 등록 또는 수정 완료
  → 상세 페이지로 이동
  → refetchQueries로 최신 데이터 다시 받기
```

## 예제 보는 순서

1. `steps/01-write-form.tsx` — 가장 작은 입력 폼
2. `steps/02-create-mutation.tsx` — 등록 Mutation 실행
3. `steps/03-create-and-move.tsx` — 등록한 ID로 상세 페이지 이동
4. `steps/04-update-mutation.tsx` — 수정 Mutation 실행
5. `steps/05-refetch-detail.tsx` — 수정 후 상세 Query 다시 요청
6. `steps/06-create-or-update.tsx` — 등록/수정 공통 폼 생각하기
7. `steps/07-image-preview.tsx` — 여러 이미지 미리보기
8. `steps/08-upload-multiple.tsx` — Promise.all로 여러 장 업로드
9. `steps/09-address-coordinate-map.tsx` — 주소·좌표와 지도 표시
10. `steps/10-product-input-with-files-address.ts` — 등록 input에 모두 합치기
11. `optional/DeleteButton.tsx` — 삭제 버튼은 진도에 따라 선택

합쳐진 모습은 아래 파일에서 확인합니다.

- `TravelProductWrite.tsx`
- `TravelProductWriteComplete.tsx`
- `operations.ts`

## 여러 이미지 업로드 흐름

```text
File[]
  → 파일마다 uploadFile 실행
  → Promise.all로 모두 기다리기
  → 서버가 준 URL[]을 images에 저장
```

상품 등록 API에는 컴퓨터의 파일 경로가 아니라 업로드 결과 URL 배열을 보냅니다.

## 주소와 좌표

- 주소: 사람이 읽는 위치
- 위도(lat): 남북 위치
- 경도(lng): 동서 위치

주소 검색 결과와 위도·경도를 `travelproductAddress`에 넣습니다.

## 등록과 수정의 공통점

등록과 수정은 모두 사용자가 입력한 값을 서버에 보냅니다.
차이는 수정할 때 “어느 데이터를 수정할지” 알려주는 ID가 추가된다는 점입니다.

## refetchQueries는 언제 사용하나요?

Mutation은 서버 데이터를 바꾸지만 현재 화면이 자동으로 바뀌지 않는 경우가 있습니다.
이때 변경된 데이터를 다시 조회하면 화면도 최신 값으로 바뀝니다.

```text
수정 Mutation 성공
  → 상세 Query 다시 실행
  → 바뀐 데이터를 화면에 표시
```

처음에는 Apollo cache를 직접 수정하는 방법보다 `refetchQueries`가 흐름을 확인하기 쉽습니다.
