"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useCheckHasBusinessQuery } from "@/lib/store/api/businessApi";
import { ROUTES } from "@/lib/constants/routes";

export function DashboardRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoaded: authLoaded, userId } = useAuth();
  const { data, isLoading, isError } = useCheckHasBusinessQuery(undefined, {
    skip: !authLoaded || !userId,
  });

  useEffect(() => {
    if (!isLoading && data && !data.has_business) {
      router.push(ROUTES.BUSINESS_CREATION.SETTINGS);
    }
  }, [data, isLoading, router]);

  if (!authLoaded || isLoading) {
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

  if (isError) {
    console.error("Failed to check business status");
    return <>{children}</>;
  }

  if (data && !data.has_business) {
    return null;
  }

  return <>{children}</>;
}
