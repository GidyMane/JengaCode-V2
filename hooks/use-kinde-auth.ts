"use client";

import { useKindeAuth as useKindeAuthLib } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

export interface KindeUser {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export function useKindeAuth() {
  const { user, isLoading, isAuthenticated, logout, login } = useKindeAuthLib();
  const [kindeUser, setKindeUser] = useState<KindeUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user && mounted) {
      setKindeUser({
        id: user.id || "",
        email: user.email || "",
        name: user.given_name && user.family_name 
          ? `${user.given_name} ${user.family_name}`
          : user.email || "",
        role: (user as any)["custom:role"] || "user",
      });
    } else {
      setKindeUser(null);
    }
  }, [user, mounted]);

  return {
    user: kindeUser,
    isLoading,
    isAuthenticated,
    logout,
    login,
    mounted,
  };
}
