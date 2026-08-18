export default function JsxExample() {

    const courseName = "리액트 기초";
    const day = 1;

    return (
        <section>
            {/* 주석 이렇게 작성합니다. 또한 JSX 파일 안에서 {} 안에 Javascript를 쓸 수 있어요. */}
            {
                // 주석도 자바스크립트 파일 스타일로 이렇게 쓸 수 있겠죠
                day + 1
            }
            <h1>{courseName}</h1>
            <p>Day {day}</p>
        </section>
    )

};