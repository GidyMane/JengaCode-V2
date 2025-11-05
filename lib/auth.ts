"use client";

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  kindeId: string;
}

export function useAuth() {
  const { user: kindeUser, isLoading: kindeLoading, isAuthenticated } = useKindeAuth();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!kindeLoading) {
          if (!isAuthenticated || !kindeUser?.id) {
            setUser(null);
            setLoading(false);
            return;
          }

          const response = await fetch("/api/auth/user");
          
          if (!response.ok) {
            if (response.status === 404) {
              setUser(null);
              setLoading(false);
              return;
            }
            throw new Error("Failed to fetch user data");
          }

          const userData: AuthUser = await response.json();
          setUser(userData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [kindeLoading, isAuthenticated, kindeUser?.id]);

  return {
    user,
    loading: kindeLoading || loading,
    error,
    isAuthenticated,
  };
}
