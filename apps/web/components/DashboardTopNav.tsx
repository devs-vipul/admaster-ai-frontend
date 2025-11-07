"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export function DashboardTopNav() {
  const { user } = useUser();

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">AdMaster AI</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-muted-foreground">
              {user.primaryEmailAddress?.emailAddress}
            </span>
          )}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
