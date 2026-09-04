"use client";

type SubmitButtonProps = {
  isEdit: boolean;
  onCreate: () => void;
  onUpdate: () => void;
};

export default function SubmitButton({
  isEdit,
  onCreate,
  onUpdate,
}: SubmitButtonProps) {
  function handleClick() {
    // 같은 폼을 등록 화면과 수정 화면에서 함께 사용할 수 있는 컴포넌트
    if (isEdit) {
      onUpdate();
      return;
    }

    onCreate();
  }

  return (
    <button onClick={handleClick}>{isEdit ? "수정하기" : "등록하기"}</button>
  );
}
