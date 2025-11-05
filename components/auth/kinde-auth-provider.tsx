"use client";

import React from "react";
import { ReactNode } from "react";

interface KindeAuthProviderProps {
  children: ReactNode;
}

export function KindeAuthProvider({ children }: KindeAuthProviderProps) {
  return <>{children}</>;
}
