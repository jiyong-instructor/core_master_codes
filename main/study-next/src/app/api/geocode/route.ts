import { NextRequest, NextResponse } from "next/server";

type GeocodeResult = {
  lat: string;
  lon: string;
};

// 같은 주소를 반복 요청하지 않도록 간단히 결과를 기억해요.
const coordinateCache = new Map<string, { lat: number; lng: number }>();

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address")?.trim();

  if (!address) {
    return NextResponse.json({ message: "주소가 필요합니다." }, { status: 400 });
  }

  const cached = coordinateCache.get(address);
  if (cached) return NextResponse.json(cached);

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", address);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "kr");

  try {
    const response = await fetch(url, {
      headers: {
        "accept-language": "ko",
        "user-agent":
          "StudyNextClassExample/1.0 (https://github.com/jiyong-instructor)",
      },
      cache: "no-store",
    });
    const results = (await response.json()) as GeocodeResult[];

    if (!results[0]) {
      return NextResponse.json(
        { message: "선택한 주소의 좌표를 찾지 못했습니다." },
        { status: 404 },
      );
    }

    const coordinate = {
      lat: Number(results[0].lat),
      lng: Number(results[0].lon),
    };
    coordinateCache.set(address, coordinate);

    return NextResponse.json(coordinate);
  } catch {
    return NextResponse.json(
      { message: "좌표 검색 서버에 연결할 수 없습니다." },
      { status: 502 },
    );
  }
}
