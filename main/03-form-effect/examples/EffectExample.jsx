import { useEffect, useState } from "react";

export default function EffectExample() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    // 멈춘 상태라면 새로운 timer를 만들지 않아요.
    if (isRunning === false) {
      return;
    }

    // timer처럼 React 바깥의 기능과 화면을 맞출 때 useEffect를 사용해요.
    const timerId = window.setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    // 화면에서 사라지거나 isRunning이 바뀌면 이전 timer를 정리해요.
    return () => window.clearInterval(timerId);
  }, [isRunning]);

  useEffect(() => {
    document.title = `공부한 시간 ${seconds}초`;

    return () => {
      document.title = "TripTalk";
    };
  }, [seconds]);

  function toggleTimer() {
    setIsRunning((previousValue) => !previousValue);
  }

  function resetTimer() {
    setSeconds(0);
    setIsRunning(false);
  }

  return (
    <main>
      <h1>오늘의 React 공부 시간</h1>
      <p>페이지 제목에서도 흐른 시간을 확인해보세요.</p>

      <section>
        <strong>{seconds}초</strong>
        <p>{isRunning ? "시간을 측정하고 있어요." : "잠시 멈췄어요."}</p>
        <button onClick={toggleTimer}>{isRunning ? "잠시 멈춤" : "다시 시작"}</button>
        <button onClick={resetTimer}>0초로 초기화</button>
      </section>
    </main>
  );
}
