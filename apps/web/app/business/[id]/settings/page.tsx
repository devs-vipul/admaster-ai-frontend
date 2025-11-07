import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export default function SettingsPage({ params }: { params: { id: string } }) {
  // Redirect to general (default submenu)
  redirect(ROUTES.SETTINGS.GENERAL(params.id));
}
