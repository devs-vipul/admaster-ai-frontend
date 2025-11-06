import { DashboardLayout } from "@/components/DashboardLayout";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export default function OptimizerPage() {
  return (
    <DashboardLayout>
      <ComingSoonPage
        title="Optimizer"
        description="AI-powered ad optimization tools coming soon"
      />
    </DashboardLayout>
  );
}
