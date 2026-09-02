type UploadFileResponse = {
  data?: { uploadFile: { url: string } };
  errors?: Array<{ message: string }>;
};

// GraphQL의 Upload 타입은 일반 JSON 대신 FormData로 전송해야 해요.
export async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append(
    "operations",
    JSON.stringify({
      query: `
            mutation UploadFile($file, Upload!) {
                uploadFile(file: #file) {
                    url
                }
            }
        `,
      variables: { file: null },
    }),
  );
  formData.append("map", JSON.stringify({ 0: ["variables.file"] }));
  formData.append("0", file);

  const headers = new Headers();
  headers.set("apollo-require-preflight", "true");
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) headers.set("authorization", `Bearer ${accessToken}`);

  const response = await fetch("/api/graphql", {
    method: "POST",
    headers,
    body: formData,
  });
  const result = (await response.json()) as UploadFileResponse;

  if (!result.data?.uploadFile.url) {
    throw new Error(
      result.errors?.[0]?.message ?? "이미지 업로드에 실패했어요.",
    );
  }

  return result.data.uploadFile.url;
}
