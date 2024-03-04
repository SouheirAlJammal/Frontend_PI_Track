import { create } from "zustand";
import zukeeper from "zukeeper";
export const useUserStore = create(
  zukeeper((set) => ({
    user:{},
    setUser: (data) => set(() => ({ user: data })),
    removeUser: () => set(() => ({ user: {} }))
  }))
);



window.store = useUserStore;
