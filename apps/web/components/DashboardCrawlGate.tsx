"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdMasterCrawlerModal } from "./AdMasterCrawlerModal";

export function DashboardCrawlGate() {
  const search = useSearchParams();
  const router = useRouter();
  const postScreen = search.get("post-screen");
  const businessId = search.get("business-id");
  const [open, setOpen] = useState<boolean>(
    postScreen === "onboarding" && Boolean(businessId),
  );

  useEffect(() => {
    setOpen(postScreen === "onboarding" && Boolean(businessId));
  }, [postScreen, businessId]);

  return (
    <>
      {postScreen === "onboarding" && businessId && open && (
        <AdMasterCrawlerModal
          businessId={businessId}
          open={open}
          onClose={() => {
            setOpen(false);

            const url = new URL(window.location.href);
            url.searchParams.delete("post-screen");
            url.searchParams.delete("business-id");
            router.replace(url.pathname + url.search);
          }}
        />
      )}
    </>
  );
}
