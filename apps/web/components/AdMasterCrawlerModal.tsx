"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCrawlBusinessMutation } from "@/lib/store/api/businessApi";
import { useUpdateBrandMutation } from "@/lib/store/api/brandApi";
import type { CrawlResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LANGUAGES, findLanguage } from "@/lib/constants/languages";

interface Props {
  businessId: string;
  open: boolean;
  onClose: () => void;
}

export function AdMasterCrawlerModal({ businessId, open, onClose }: Props) {
  const [crawl, { isLoading: isCrawling }] = useCrawlBusinessMutation();
  const [updateBrand, { isLoading: isSaving }] = useUpdateBrandMutation();
  const [result, setResult] = useState<CrawlResponse | null>(null);
  const [local, setLocal] = useState<CrawlResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const data = await crawl(businessId).unwrap();
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
  }, [open, businessId, crawl]);

  const handleSave = async () => {
    if (!local) return;

    setSaveError(null);
    try {
      await updateBrand({
        businessId,
        data: {
          description: local.description,
          logo_url: local.logo_url || null,
          brand_colors: local.brand_colors,
          tone_of_voice: local.tone_of_voice,
          language: local.language,
          is_complete: true,
        },
      }).unwrap();

      onClose();
    } catch (e: any) {
      setSaveError(e?.message ?? "Failed to save brand information");
    }
  };

  const isLoading = isCrawling || isSaving;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl">
        {isCrawling && !result ? (
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

            <DialogTitle className="text-2xl mb-4">
              AdMaster-Crawler is analyzing your business...
            </DialogTitle>

            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>

            <DialogDescription>
              Our AI will suggest the best ad platform(s) based on your
              business.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                Here is what we learned about your brand
              </DialogTitle>
              <DialogDescription>
                AdMaster-Crawler has successfully analyzed your business and
                will use the following information to create high-performing ad
                campaigns.
              </DialogDescription>
            </DialogHeader>
          </>
        )}

        {(error || saveError) && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded">
            <p className="text-sm text-destructive">{error || saveError}</p>
          </div>
        )}

        {local && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="md:col-span-1 flex items-center gap-3">
                {local.logo_url ? (
                  <Image
                    src={local.logo_url}
                    alt="Logo"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-md border object-contain bg-white"
                    unoptimized
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
                    <Input
                      value={hex}
                      onChange={(e) => {
                        const next = [...local.brand_colors];
                        next[idx] = e.target.value;
                        setLocal({ ...local, brand_colors: next });
                      }}
                      className="h-9 w-[110px] px-2 text-sm"
                    />
                    {local.brand_colors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const next = local.brand_colors.filter(
                            (_, i) => i !== idx,
                          );
                          setLocal({ ...local, brand_colors: next });
                        }}
                        aria-label="Remove color"
                        title="Remove color"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {local.brand_colors.length < 5 && (
                <div className="mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const next = [...local.brand_colors, "#14803B"];
                      setLocal({ ...local, brand_colors: next.slice(0, 5) });
                    }}
                  >
                    Add color
                  </Button>
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
                      <Button
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
                        variant={selected ? "default" : "outline"}
                        size="sm"
                      >
                        {tone}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Language</p>
                <Select
                  value={findLanguage(local?.language)?.code || "en"}
                  onValueChange={(code) => {
                    setLocal((prev) => ({
                      ...(prev as CrawlResponse),
                      language: code || "en",
                    }));
                  }}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l.code} value={l.code}>
                        <span className="mr-2">{l.flag}</span>
                        {l.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Close
              </Button>
              <Button type="button" onClick={handleSave} disabled={isLoading}>
                {isSaving ? "Saving..." : "Continue"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
