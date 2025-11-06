"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

// Global token getter function
let getTokenFn: (() => Promise<string | null>) | null = null;

export function setTokenGetter(fn: () => Promise<string | null>) {
  getTokenFn = fn;
}

export function getTokenGetter() {
  return getTokenFn;
}

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  return <>{children}</>;
}
