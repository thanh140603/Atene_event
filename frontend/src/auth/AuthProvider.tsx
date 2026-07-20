import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { GoogleUser } from '../types';

// Session-scoped so the Google credential (short-lived JWT) never outlives the tab.
const STORAGE_KEY = 'atene.googleUser';

interface AuthContextValue {
  user: GoogleUser | null;
  signIn: (user: GoogleUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function restore(): GoogleUser | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GoogleUser) : null;
  } catch {
    return null;
  }
}

/** Holds the signed-in Gmail account so the header button and booking flow share it. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GoogleUser | null>(restore);

  const signIn = useCallback((u: GoogleUser) => {
    setUser(u);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    window.google?.accounts.id.disableAutoSelect();
  }, []);

  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
