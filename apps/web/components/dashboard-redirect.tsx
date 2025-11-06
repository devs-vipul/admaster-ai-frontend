"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useCheckHasBusinessQuery } from "@/lib/store/api/businessApi";

export function DashboardRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  // Get token first
  useEffect(() => {
    getToken().then(setToken);
  }, [getToken]);

  // Use RTK Query hook - automatically handles loading, error, caching
  const { data, isLoading, isError } = useCheckHasBusinessQuery(token!, {
    skip: !token, // Don't run query until we have token
  });

  // Redirect logic
  useEffect(() => {
    if (!isLoading && data && !data.has_business) {
      router.push("/business-creation/settings");
    }
  }, [data, isLoading, router]);

  // Show loading state
  if (isLoading || !token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Show error state (but still render children - fail gracefully)
  if (isError) {
    console.error("Failed to check business status");
    return <>{children}</>;
  }

  // If user has no business, they'll be redirected (return null while redirecting)
  if (data && !data.has_business) {
    return null;
  }

  // User has businesses, show dashboard
  return <>{children}</>;
}
