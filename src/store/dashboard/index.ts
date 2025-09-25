import { create } from "zustand";

interface DashboardFilterStore {
  selectFilterOption: "WEEKLY" | "MONTHLY" | "YEARLY";
  setSelectFilterOption: (option: "WEEKLY" | "MONTHLY" | "YEARLY") => void;
}

export const useDashboardFilterStore = create<DashboardFilterStore>((set) => ({
  selectFilterOption: "MONTHLY",
  setSelectFilterOption: (option) => set({ selectFilterOption: option }),
}));
