import { create } from "zustand";
import zukeeper from "zukeeper";
import axios from 'axios'

export const useUserStore = create(
  zukeeper((set) => ({
    user:null,
    setUser: (data) => set(() => ({ user: data })),
    removeUser: () => set(() => ({ user: null })),
    logOut:async ()=>{
        try {
            const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}api/users/logout`);
            set(() => ({ user: null }));
          } catch (err) {
            console.error("Error logging out :", err);
            set(() => ({ user: null }));
          }
    }
  }))
);



window.store = useUserStore;
