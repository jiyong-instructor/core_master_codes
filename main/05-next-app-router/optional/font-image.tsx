import Image from "next/image";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

export default function FontImageExample() {
  return (
    <section className={notoSansKr.className}>
      <h1>Next의 font와 image</h1>
      {/* width와 height를 알려주면 이미지가 들어갈 자리를 먼저 계산할 수 있어요. */}
      <Image src="/trip.jpg" alt="제주 바다" width={400} height={260} />
    </section>
  );
}
