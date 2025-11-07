import { getUserDetails } from "@/lib/auth";
import { DashboardRedirect } from "@/components/dashboard-redirect";
import { DashboardLayout } from "@/components/DashboardLayout";
import { redirect } from "next/navigation";

export default async function TimelinePage() {
  const user = await getUserDetails();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <DashboardRedirect>
      <DashboardLayout>
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Timeline</h2>
          <p className="text-muted-foreground mt-2">
            Your activity and progress timeline
          </p>
        </div>

        {/* Timeline content will go here */}
        <div className="space-y-4">
          <div className="p-6 bg-card border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
            <p className="text-sm text-muted-foreground">
              Track your onboarding progress
            </p>
          </div>
        </div>
      </DashboardLayout>
    </DashboardRedirect>
  );
}
