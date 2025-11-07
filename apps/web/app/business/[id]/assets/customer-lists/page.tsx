"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function AssetsCustomerListsPage({
  params: _params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Customer Lists"
        description="Manage your customer data and product lists"
      />
    </DashboardLayout>
  );
}
