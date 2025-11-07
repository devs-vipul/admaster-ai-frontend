"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function SettingsTeamMembersPage({
  params: _params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Team Members"
        description="Manage your team members and permissions"
      />
    </DashboardLayout>
  );
}
