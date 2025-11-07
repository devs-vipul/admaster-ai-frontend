import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Notifications"
        description="Stay updated with your ad performance and alerts"
      />
    </DashboardLayout>
  );
}
