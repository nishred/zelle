import { create } from "zustand";

type TBalance = {
  balance: {
    id?: number;
    amount?: number;
    locked?: number;
    userId?: number;
  };

   

};

export const useBalanceStore = create<TBalance>((set) => ({

    balance : {},


}));

