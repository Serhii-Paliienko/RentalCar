import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => {
          const exists = s.ids.includes(id);
          return {
            ids: exists ? s.ids.filter((x) => x !== id) : [...s.ids, id],
          };
        }),
      has: (id) => get().ids.includes(id),
    }),
    { name: "rental:favs" }
  )
);
