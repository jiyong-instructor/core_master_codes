import { useEffect, useState } from "react";

export default function EffectStorageExample() {
  const [memo, setMemo] = useState("");
  const [savedMemo, setSavedMemo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => { // 컴포넌트가 처음 렌더링 될 때, 브라우저의 localStorage에서 저장된 메모를 가져와서 상태를 초기화해요.
    // localStorage도 브라우저가 제공하는 외부 저장 공간이에요.
    const storageMemo = window.localStorage.getItem("tripMemo") ?? "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMemo(storageMemo);
    setSavedMemo(storageMemo);
  }, []);

  function handleMemoChange(event) {
    setMemo(event.target.value);
    setMessage("");
  }

  function saveMemo() {
    window.localStorage.setItem("tripMemo", memo);
    setSavedMemo(memo);
    setMessage("메모를 브라우저에 저장했어요.");
  }

  function removeMemo() {
    window.localStorage.removeItem("tripMemo");
    setMemo("");
    setSavedMemo("");
    setMessage("저장한 메모를 삭제했어요.");
  }

  return (
    <main>
      <h1>여행 준비 메모</h1>
      <p>저장한 뒤 새로고침해도 내용이 남아 있는지 확인해보세요.</p>

      <section>
        <label htmlFor="memo">준비할 내용</label>
        <textarea
          id="memo"
          value={memo}
          onChange={handleMemoChange}
          placeholder="예: 여권, 충전기, 우산"
          maxLength={100}
        />
        <p>{memo.length} / 100자</p>

        <button onClick={saveMemo} disabled={memo.trim() === ""}>
          메모 저장
        </button>
        <button onClick={removeMemo} disabled={savedMemo === ""}>
          저장한 메모 삭제
        </button>
      </section>

      <section>
        <h2>현재 저장된 메모</h2>
        <p>{savedMemo || "아직 저장된 메모가 없어요."}</p>
        {message && <p>{message}</p>}
      </section>
    </main>
  );
}
