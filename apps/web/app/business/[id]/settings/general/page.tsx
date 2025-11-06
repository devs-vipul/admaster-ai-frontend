"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function SettingsGeneralPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="General Settings"
        description="Configure your business general settings"
      />
    </DashboardLayout>
  );
}
