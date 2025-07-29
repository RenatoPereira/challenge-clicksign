import { create } from "zustand";

interface SearchState {
  search: string;
  history: string[];
  searchBy: (by: string) => void;
  clearFromHistory: (search: string) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  search: "",
  history: [],
  searchBy: (by) =>
    set((state) => {
      if (!by || by.trim() === "") {
        return { search: by };
      }

      let history = state.history.filter((item) => item !== by);

      history.unshift(by);

      return { history: history.slice(0, 5), search: by };
    }),
  clearFromHistory: (search) =>
    set((state) => {
      const history = state.history.filter((item) => item !== search);
      return { history };
    }),
}));
