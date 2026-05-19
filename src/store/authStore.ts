import { create } from 'zustand';
import { AuthState, User } from '@/types/auth';

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    name: '系统管理员',
    role: 'admin',
  },
  {
    id: '2',
    username: 'user',
    name: '普通用户',
    role: 'user',
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (username: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(
      (u) => u.username === username && password === '123456'
    );
    
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('authUser', JSON.stringify(user));
      return true;
    }
    
    set({ isLoading: false });
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('authUser');
  },
}));

// Initialize from localStorage
const savedUser = localStorage.getItem('authUser');
if (savedUser) {
  const user = JSON.parse(savedUser);
  useAuthStore.setState({ user, isAuthenticated: true });
}
