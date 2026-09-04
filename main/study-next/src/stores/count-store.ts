import { create } from "zustand";

type CountStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
};

// create로 컴포넌트 바깥에 공용 상태 저장소를 만들어요.
export const useCountStore = create<CountStore>()((set) => ({
  count: 0,

  // 이전 값으로 다음 값을 계산할 때는 state를 받아 사용해요.
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),

  // 이전 값이 필요하지 않다면 바꿀 값만 적어도 돼요.
  reset: () => set({ count: 0 }),
}));
