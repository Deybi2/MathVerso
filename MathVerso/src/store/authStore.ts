import { create } from 'zustand';
import { pb } from '../services/pocketbaseClient';
import { RecordModel } from 'pocketbase';

interface AuthState {
  user: RecordModel | null;
  isLoading: boolean;
  initializeSession: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  // Inicializar sesión
  initializeSession: async () => {
    set({ isLoading: true });
    try {
      if (pb.authStore.isValid) {
        set({ user: pb.authStore.model as RecordModel });
      } else {
        set({ user: null });
      }
    } catch (e) {
      console.error("Error al inicializar sesión:", e);
    } finally {
      set({ isLoading: false });
    }
  },

  // Iniciar sesión
  signIn: async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      set({ user: authData.record });
      return { error: null };
    } catch (e: any) {
      const message = e?.data?.message || 'Error desconocido';
      return { error: message };
    }
  },

  // Registro
  signUp: async (email, password, name) => {
    try {
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name,
        verified: false,
      });

      const authData = await pb.collection('users').authWithPassword(email, password);
      set({ user: authData.record });
      return { error: null };
    } catch (e: any) {
      const message = e?.data?.message || 'Error desconocido';
      return { error: message };
    }
  },

  // Cerrar sesión
  signOut: async () => {
    try {
      pb.authStore.clear();
      set({ user: null });
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  },
}));
