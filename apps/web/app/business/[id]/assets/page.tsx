import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export default function AssetsPage({ params }: { params: { id: string } }) {
  // Redirect to media gallery (default submenu)
  redirect(ROUTES.ASSETS.MEDIA_GALLERY(params.id));
}
