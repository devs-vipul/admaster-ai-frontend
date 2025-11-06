"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function AssetsCopywritingPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Copywriting"
        description="Manage your ad copy and messaging assets"
      />
    </DashboardLayout>
  );
}
