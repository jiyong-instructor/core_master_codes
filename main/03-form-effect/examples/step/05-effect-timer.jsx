import { useState, useEffect } from 'react';

export default function EffectTimerExample() {

    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);


    useEffect(() => {

        if (isRunning === false) {
            return;
        }

        const timerId = window.setInterval(() => {
            // 이전 상태를 기반으로 새로운 상태를 계산할 때는 setState에 함수를 전달하는 것이 좋아요.
            setSeconds((prevSeconds) => prevSeconds + 1);
            console.log(seconds);
        }, 1000);

        // cleanup은 조건이 바뀌거나 컴포넌트가 사라질 때 실행되는 함수에요. 
        // 이곳에서 타이머를 정리해주지 않으면, 컴포넌트가 사라져도 타이머가 계속 돌아서 메모리 누수가 발생할 수 있어요.
        return () => window.clearInterval(timerId);

    }, [isRunning]); // isRunning이 바뀔 때마다 이 useEffect가 실행됩니다.



    function startTimer() {
        setIsRunning(true);
    }

    function stopTimer() {
        setIsRunning(false);
    }

    function resetTimer() {
        setIsRunning(false);
        setSeconds(0);
    }


    return (<main>

        <h1>여행 준비 타이머</h1>
        <p>준비를 시작하고 흐른 시간을 확인해요.</p>

        <section>
            <strong>{seconds}</strong>초
            <p>{isRunning ? '시간이 흐르고 있어요.' : '타이머가 멈춰 있어요'}</p>

            <button onClick={startTimer} disabled={isRunning}>시작</button>
            <button onClick={stopTimer} disabled={isRunning === false}>멈춤</button>
            <button onClick={resetTimer} disabled={seconds === 0}>초기화</button>

        </section>

    </main>)

}