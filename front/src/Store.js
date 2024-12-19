import { create } from "zustand";
import zukeeper from "zukeeper";
import axios from "axios";
export const useUserStore = create(
  zukeeper((set) => ({
    user: null,
    setUser: (data) => set(() => ({ user: data })),
    removeUser: async () => {
      try {
        await axios.post(`${process.env.REACT_APP_ENDPOINT}api/users/logout`,{ withCredentials: true });
        set(() => ({ user: null })); 
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  }))
);



window.store = useUserStore;
