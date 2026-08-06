"use client";

import { create } from "zustand";

import {
  createSession,
  destroySession,
  restoreSession,
} from "@/lib/api-client";
import type { User, UserRole } from "@/lib/types";


type SignupPayload = {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  company_name?: string;
};

type AuthState = {
  user: User | null;
  initializing: boolean;
  bootstrap: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  initializing: true,
  bootstrap: async () => {
    if (!get().initializing) return;
    try {
      const session = await restoreSession();
      set({ user: session?.user ?? null, initializing: false });
    } catch {
      set({ user: null, initializing: false });
    }
  },
  login: async (email, password) => {
    const session = await createSession("login", { email, password });
    set({ user: session.user, initializing: false });
  },
  signup: async (payload) => {
    const session = await createSession("signup", payload);
    set({ user: session.user, initializing: false });
  },
  logout: async () => {
    await destroySession();
    set({ user: null, initializing: false });
  },
}));
