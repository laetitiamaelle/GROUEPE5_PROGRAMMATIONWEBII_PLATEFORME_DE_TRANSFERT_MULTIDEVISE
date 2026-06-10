"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiGet } from "@/lib/api-client";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  currency: string;
  balance_eur: number;
  role: "user" | "admin";
  created_at: string;
};

type UserContextType = {
  user: CurrentUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refresh: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await apiGet<CurrentUser>("/api/v1/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <UserContext.Provider value={{ user, loading, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(UserContext);
}