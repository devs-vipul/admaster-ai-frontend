"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function SettingsIntegrationsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Integrations"
        description="Connect and manage your third-party integrations"
      />
    </DashboardLayout>
  );
}
