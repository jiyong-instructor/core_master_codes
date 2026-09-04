import { create } from "zustand";

// store에 들어갈 상태와 함수의 모양을 적어요.
type CountStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
};

// create가 컴포넌트 바깥에 공용 store를 만들어요.
export const useCountSotre = create<CountStore>()((set) => ({
  // 처음 숫자 0
  count: 0,

  // 이전 상태가 필요하면 set안에서 state를 받아요.
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
