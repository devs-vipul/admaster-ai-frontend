"use client";

import { useEffect, useState } from "react";
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
  const { getToken, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && getToken) {
      // Wrap getToken to ensure it's always available
      const tokenGetter = async () => {
        try {
          if (!userId) {
            console.warn("No user ID - user may not be authenticated");
            return null;
          }
          const token = await getToken();
          if (token) {
            console.log("Token retrieved successfully");
          } else {
            console.warn("Token getter returned null");
          }
          return token;
        } catch (error) {
          console.error("Error getting token:", error);
          return null;
        }
      };
      setTokenGetter(tokenGetter);
      console.log("TokenProvider initialized", {
        isLoaded,
        hasGetToken: !!getToken,
        userId,
      });
    } else {
      console.warn("TokenProvider not ready", {
        isLoaded,
        hasGetToken: !!getToken,
      });
    }
  }, [isLoaded, getToken, userId]);

  // Always render children - don't block rendering
  return <>{children}</>;
}
