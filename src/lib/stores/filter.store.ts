import { create } from "zustand";

interface FilterState {
  filter: string | null;
  filterBy: (by: string | null) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  filter: null,
  filterBy: (by) => set((state) => ({ filter: by })),
}));
