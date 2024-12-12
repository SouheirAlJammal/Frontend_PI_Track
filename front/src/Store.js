import { create } from "zustand";
import zukeeper from "zukeeper";
import axios from "axios";
export const useUserStore = create(
  zukeeper((set) => ({
    user:null,
    setUser: (data) => set(() => ({ user: data })),
    removeUser: async() => {
      await axios.post(`${process.env.REACT_APP_ENDPOINT}api/users/logout`);
 
      set(() => ({ user: null }));
    }
  }))
);



window.store = useUserStore;
