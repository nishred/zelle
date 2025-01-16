import { create } from "zustand";

type TBalance = {
  balance: number;
};

export const useBalanceStore = create<TBalance>((set) => ({
  balance: 100,
}));
