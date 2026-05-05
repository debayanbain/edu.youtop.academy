import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'user' | 'admin';

export interface UserState {
  // Data
  id: number | null;
  clerkId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  imageUrl: string | null;
  role: UserRole | null;

  // Status
  isSynced: boolean;
  backendError: boolean;

  // Actions
  setUser: (user: Partial<Omit<UserState, 'setUser' | 'clearUser' | 'setSynced'>>) => void;
  clearUser: () => void;
  setSynced: (synced: boolean) => void;
  setBackendError: (error: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state
      id: null,
      clerkId: null,
      firstName: null,
      lastName: null,
      email: null,
      imageUrl: null,
      role: null,
      isSynced: false,
      backendError: false,

      setUser: (user) => set((state) => ({ ...state, ...user })),
      clearUser: () =>
        set({
          id: null,
          clerkId: null,
          firstName: null,
          lastName: null,
          email: null,
          imageUrl: null,
          role: null,
          isSynced: false,
          backendError: false,
        }),
      setSynced: (synced) => set({ isSynced: synced }),
      setBackendError: (error) => set({ backendError: error }),
    }),
    {
      name: 'youtop-user',
      // Only persist non-sensitive fields
      partialize: (state) => ({
        id: state.id,
        clerkId: state.clerkId,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        imageUrl: state.imageUrl,
        role: state.role,
        isSynced: state.isSynced,
        backendError: state.backendError,
      }),
    },
  ),
);
