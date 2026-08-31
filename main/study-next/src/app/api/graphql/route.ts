import { NextRequest, NextResponse } from "next/server";

const PRACTICE_API_URL = "https://main-practice.codebootcamp.co.kr/graphql"; // 과제용 api 주소

export async function POST(request: NextRequest) {
  // 브라우저가 보낸 GRAPHQL 요청 내용을 그대로 읽어요.
  const body = await request.text();

  // 과제용 서버에 필요한 헤더만 골라서 전달해요.
  const headers = new Headers({
    "content-type": "application/json",
    origin: request.headers.get("origin") ?? request.nextUrl.origin,
  });

  const authorization = request.headers.get("authorization");
  const cookie = request.headers.get("cookie");

  if (authorization) headers.set("authorization", authorization);
  if (cookie) headers.set("cookie", cookie);

  try {
    const response = await fetch(PRACTICE_API_URL, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });

    const responseBody = await response.text();
    const nextResponse = new NextResponse(responseBody, {
      status: response.status,
      headers: { "content-type": "application/json" },
    });

    // 서버가 refresh token 쿠키를 내려주면 브라우저까지 전달해요.
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) nextResponse.headers.set("set-cookie", setCookie);

    return nextResponse;
  } catch {
    return NextResponse.json(
      { errors: [{ message: "과제용 API 서버에 연결할 수 없습니다." }] },
      { status: 502 },
    );
  }
}
