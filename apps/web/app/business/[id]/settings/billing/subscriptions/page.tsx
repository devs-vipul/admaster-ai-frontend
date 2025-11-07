"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function BillingSubscriptionsPage({
  params: _params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Subscriptions"
        description="Manage your subscription plans and billing"
      />
    </DashboardLayout>
  );
}
