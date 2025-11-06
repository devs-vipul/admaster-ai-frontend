"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useCrawlBusinessMutation } from "@/lib/store/api/businessApi";
import type { CrawlResponse } from "@/lib/types";

interface Props {
  businessId: string;
  open: boolean;
  onClose: () => void;
}

export function AdMasterCrawlerModal({ businessId, open, onClose }: Props) {
  const { getToken } = useAuth();
  const [crawl, { isLoading }] = useCrawlBusinessMutation();
  const [result, setResult] = useState<CrawlResponse | null>(null);
  const [local, setLocal] = useState<CrawlResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const token = await getToken();
        if (!token) throw new Error("No auth token");
        const data = await crawl({ token, id: businessId }).unwrap();
        if (!cancelled) {
          setResult(data);
          setLocal(data);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to crawl website");
      }
    }
    if (open && businessId) run();
    return () => {
      cancelled = true;
    };
  }, [open, businessId, getToken, crawl]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-xl border bg-card p-6 shadow-xl">
        {isLoading && !result ? (
          <div className="py-12 text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-24 bg-slate-200 dark:bg-slate-700 rounded-lg border-4 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                  <div className="w-16 h-12 bg-white dark:bg-slate-800 rounded flex items-center justify-center">
                    <div className="w-8 h-1 bg-slate-300 dark:bg-slate-600 rounded mb-1"></div>
                    <div className="w-6 h-1 bg-slate-300 dark:bg-slate-600 rounded"></div>
                  </div>
                </div>

                <div className="absolute -right-4 -top-2 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              AdMaster-Crawler is analyzing your business...
            </h3>

            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>

            <p className="text-sm text-muted-foreground">
              Our AI will suggest the best ad platform(s) based on your
              business.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-1">
              Here is what we learned about your brand
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              AdMaster-Crawler has successfully analyzed your business and will
              use the following information to create high-performing ad
              campaigns.
            </p>
          </>
        )}

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {local && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="md:col-span-1 flex items-center gap-3">
                {local.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={local.logo_url}
                    alt="Logo"
                    className="h-12 w-12 rounded-md border object-contain bg-white"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-md border bg-muted" />
                )}
                <span className="text-sm text-muted-foreground">Logo</span>
              </div>
              <div className="md:col-span-3">
                <textarea
                  className="w-full min-h-[84px] resize-y rounded-md border bg-background p-3 text-sm"
                  value={local.description}
                  onChange={(e) =>
                    setLocal({ ...local, description: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Brand colors</p>
              <div className="flex gap-3 flex-wrap">
                {(local.brand_colors.length
                  ? local.brand_colors
                  : ["#14803B"]
                ).map((hex, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={hex}
                      onChange={(e) => {
                        const next = [...local.brand_colors];
                        next[idx] = e.target.value;
                        setLocal({ ...local, brand_colors: next });
                      }}
                      className="h-9 w-9 rounded-md border"
                    />
                    <input
                      value={hex}
                      onChange={(e) => {
                        const next = [...local.brand_colors];
                        next[idx] = e.target.value;
                        setLocal({ ...local, brand_colors: next });
                      }}
                      className="h-9 w-[110px] rounded-md border bg-background px-2 text-sm"
                    />
                    {local.brand_colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const next = local.brand_colors.filter(
                            (_, i) => i !== idx
                          );
                          setLocal({ ...local, brand_colors: next });
                        }}
                        className="h-9 rounded-md border px-2 text-xs"
                        aria-label="Remove color"
                        title="Remove color"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {local.brand_colors.length < 5 && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...local.brand_colors, "#14803B"];
                      setLocal({ ...local, brand_colors: next.slice(0, 5) });
                    }}
                    className="h-9 rounded-md border px-3 text-sm"
                  >
                    Add color
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Tone of voice</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Professional",
                    "Casual",
                    "Humorous",
                    "Informative",
                    "Motivating",
                    "Optimistic",
                  ].map((tone) => {
                    const selected = local.tone_of_voice.includes(tone);
                    return (
                      <button
                        type="button"
                        key={tone}
                        onClick={() => {
                          const set = new Set(local.tone_of_voice);
                          if (selected) set.delete(tone);
                          else set.add(tone);
                          setLocal({
                            ...local,
                            tone_of_voice: Array.from(set),
                          });
                        }}
                        className={
                          "rounded-md border px-3 py-1 text-sm " +
                          (selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-background")
                        }
                      >
                        {tone}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Language</p>
                <input
                  value={local.language}
                  onChange={(e) =>
                    setLocal({ ...local, language: e.target.value })
                  }
                  className="h-9 rounded-md border bg-background px-2 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className="h-9 rounded-md border px-3 text-sm"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground"
                onClick={onClose}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
