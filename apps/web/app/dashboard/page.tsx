"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Dashboard"
        description="Your comprehensive marketing dashboard is coming soon"
      />
    </DashboardLayout>
  );
}
