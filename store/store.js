import create from "zustand";
import { persist } from "zustand/middleware";

const useSetSelectUser = create(
  persist((set) => ({
    selected: false,
    user: {},
    setUser: (param) => {
      set(() => ({
        selected: true,
        user: param,
      }));
    },
    clearUser: () => set({ selected: false, user: {} }),
  }))
);

export default useSetSelectUser;
