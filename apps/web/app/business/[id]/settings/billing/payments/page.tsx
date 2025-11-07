"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function BillingPaymentsPage({
  params: _params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Payments"
        description="View and manage your payment history"
      />
    </DashboardLayout>
  );
}
