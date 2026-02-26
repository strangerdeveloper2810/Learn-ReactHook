import { create } from 'zustand';

const STORAGE_KEY = 'baucua_user';

interface User {
  name: string;
  isGuest: boolean;
}

interface AuthState {
  user: User | null;
  loginAsGuest: (name: string) => void;
  logout: () => void;
}

const getStoredUser = (): User | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),

  loginAsGuest: (name: string) => {
    const user: User = { name: name || 'Khách', isGuest: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
}));

export default useAuthStore;
