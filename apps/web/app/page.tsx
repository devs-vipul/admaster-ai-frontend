import { getUserDetails } from "@/lib/auth";
import { DashboardRedirect } from "@/components/dashboard-redirect";
import { DashboardCrawlGate } from "@/components/DashboardCrawlGate";
import { DashboardLayout } from "@/components/DashboardLayout";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUserDetails();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <DashboardRedirect>
      <DashboardLayout>
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.firstName || "there"}! 👋
          </h2>
          <p className="text-muted-foreground mt-2">
            Your AI-powered marketing automation dashboard
          </p>
        </div>

        {/* Dashboard content  */}
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
      </DashboardLayout>
      <DashboardCrawlGate />
    </DashboardRedirect>
  );
}
