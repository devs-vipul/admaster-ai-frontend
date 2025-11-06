import { UserButton } from "@clerk/nextjs";
import { getUserDetails } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardRedirect } from "@/components/dashboard-redirect";

export default async function DashboardPage() {
  const user = await getUserDetails();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <DashboardRedirect>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">AdMaster AI</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
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

        <main className="container px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back, {user.firstName || "there"}! 👋
            </h2>
            <p className="text-muted-foreground mt-2">
              Your AI-powered marketing automation dashboard
            </p>
          </div>

          {/* Dashboard content will go here */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Your Businesses</h3>
              <p className="text-sm text-muted-foreground">
                Manage your onboarded businesses
              </p>
            </div>
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
              <p className="text-sm text-muted-foreground">
                View your running ad campaigns
              </p>
            </div>
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track performance metrics
              </p>
            </div>
          </div>
        </main>
      </div>
    </DashboardRedirect>
  );
}
