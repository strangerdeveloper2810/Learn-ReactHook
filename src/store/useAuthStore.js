import { create } from "zustand";

const STORAGE_KEY = "baucua_user";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem(STORAGE_KEY)),

  loginAsGuest: (name) => {
    const user = { name: name || "Khách", isGuest: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
}));

export default useAuthStore;
