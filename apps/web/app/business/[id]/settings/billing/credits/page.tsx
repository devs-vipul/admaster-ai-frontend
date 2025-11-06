"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function BillingCreditsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Billing Credits"
        description="Manage your account credits and balance"
      />
    </DashboardLayout>
  );
}
