"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function SettingsConversionsPage({
  params: _params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Conversions"
        description="Configure conversion tracking and goals"
      />
    </DashboardLayout>
  );
}
