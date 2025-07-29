import { create } from "zustand";

export type OrderType = "alphabetical" | "started_recently" | "next_to_end";

interface OrderState {
  order: OrderType;
  orderBy: (by: OrderType) => void;
}

export const useOrderStore = create<OrderState>()((set) => ({
  order: "alphabetical",
  orderBy: (by) => set(() => ({ order: by })),
}));
