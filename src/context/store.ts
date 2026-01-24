import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Store {
  bookId: number | null;
  setBookId: (value: number | null) => void;
  resetBookId: () => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      bookId: null,

      setBookId: (bookId) =>
        set({ bookId }),

      resetBookId: () =>
        set({ bookId: null }),
    }),
    {
      name: "Book-app",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
