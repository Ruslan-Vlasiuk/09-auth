"use client";
import { useEffect, useState, type ReactNode } from 'react';
import { checkSession, getMe } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          if (user) setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (loading) return null;

  return <>{children}</>;
}
