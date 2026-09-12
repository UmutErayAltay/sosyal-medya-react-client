import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api, setAuthToken, setUnauthorizedHandler } from "../lib/api";
import type { AuthUser } from "../types/api";

const STORAGE_KEY = "smrc_auth";

interface StoredAuth {
  token: string;
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStored(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredAuth) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(() => loadStored());

  useEffect(() => {
    setAuthToken(auth?.token ?? null);
  }, [auth]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setAuth(null);
      localStorage.removeItem(STORAGE_KEY);
    });
  }, []);

  const persist = (next: StoredAuth) => {
    setAuth(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user: auth?.user ?? null,
      token: auth?.token ?? null,
      login: async (email, password) => {
        const res = await api.login(email, password);
        persist({ token: res.token, user: res.user });
      },
      register: async (email, password, username) => {
        const res = await api.register(email, password, username);
        persist({ token: res.token, user: res.user });
      },
      logout: () => {
        setAuth(null);
        localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
