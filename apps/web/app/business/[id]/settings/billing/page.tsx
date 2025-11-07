import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export default function BillingPage({ params }: { params: { id: string } }) {
  // Redirect to credits (default submenu)
  redirect(ROUTES.BILLING.CREDIT(params.id));
}
