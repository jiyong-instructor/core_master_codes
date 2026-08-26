async function createPost(input) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (response.ok === false) {
    throw new Error(`등록 실패: ${response.status}`);
  }

  return response.json();
}

async function submitPost() {
  const input = {
    title: "내 여행",
    body: "이번 여행은 정말 즐거웠어요.",
    userId: 1,
  };

  const createdPost = await createPost(input);

  console.log(createdPost);
}

submitPost();
