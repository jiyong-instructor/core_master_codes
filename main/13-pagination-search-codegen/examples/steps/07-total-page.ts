export function makeLastPage(totalCount: number, pageSize: number) {
  // 게시글 23개를 한 페이지에 10개씩 보여주면 마지막은 3페이지 겠죠?
  return Math.ceil(totalCount / pageSize);
}

const lastPage = makeLastPage(23, 10);
console.log(lastPage);
