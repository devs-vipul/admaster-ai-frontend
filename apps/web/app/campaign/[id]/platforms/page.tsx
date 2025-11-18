"use client";

import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Sparkles, Info } from "lucide-react";
import { useState, useMemo } from "react";
import { useGetPlatformsQuery } from "@/lib/store/api/platformApi";
import { useGetCampaignByIdQuery } from "@/lib/store/api/campaignApi";
import type { Platform } from "@/lib/types/campaign";

export default function PlatformRecommendationPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [selectedPlatformId, setSelectedPlatformId] = useState<number | null>(
    null
  );

  // Fetch campaign data to get recommended and supported platforms
  const { data: campaignListResponse, isLoading: campaignLoading } =
    useGetCampaignByIdQuery(campaignId);

  // Extract the first campaign from the list response
  const campaign = campaignListResponse?.campaign_groups?.[0];

  // Fetch all platforms from API
  const { data: platforms, isLoading: platformsLoading } =
    useGetPlatformsQuery();

  // Get recommended and supported platform IDs from campaign
  const recommendedPlatformId = campaign?.recommended_platform || 0;
  const supportedPlatformIds = campaign?.supported_platforms || [];

  const recommendedPlatform = useMemo(() => {
    return platforms?.find((p) => p.platform_id === recommendedPlatformId);
  }, [platforms, recommendedPlatformId]);

  const allPlatforms = useMemo(() => {
    if (!platforms) return [];
    return platforms.filter((p) =>
      supportedPlatformIds.includes(p.platform_id)
    );
  }, [platforms, supportedPlatformIds]);

  function handleContinue() {
    router.push(`/campaign/${campaignId}/account`);
  }

  function handleSeeMoreOptions() {
    setShowMoreOptions(true);
  }

  function handleSelectPlatform(platformId: number) {
    setSelectedPlatformId(platformId);
  }

  if (campaignLoading || platformsLoading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-muted-foreground">
                Loading campaign and platforms...
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!recommendedPlatform) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center">
            <p className="text-muted-foreground">
              No platform recommendations available
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (showMoreOptions) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Select your platform and account
            </h1>
            <p className="text-muted-foreground">
              Choose the platform(s) you want to advertise on
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {allPlatforms.map((platform) => (
              <Card
                key={platform.platform_id}
                className={`cursor-pointer transition-colors ${
                  selectedPlatformId === platform.platform_id
                    ? "border-2 border-primary"
                    : "hover:border-primary"
                }`}
                onClick={() => handleSelectPlatform(platform.platform_id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>{platform.name}</span>
                  </CardTitle>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
                {platform.requires_own_account && (
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Info className="h-4 w-4" />
                      <span>Requires having your own ad account</span>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setShowMoreOptions(false)} variant="outline">
              Go back
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1"
              disabled={!selectedPlatformId}
            >
              Next
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            AdMaster AI has found the best ad platform for you
          </h1>
          <p className="text-muted-foreground">
            Based on your campaign goals and target audience
          </p>
        </div>

        <Card className="mb-6 border-2 border-primary">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                Recommended
              </span>
            </div>
            <CardTitle className="text-2xl">
              {recommendedPlatform.name}
            </CardTitle>
            <CardDescription>{recommendedPlatform.description}</CardDescription>
          </CardHeader>
          {recommendedPlatform.requires_own_account && (
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Requires having your own ad account</span>
              </div>
            </CardContent>
          )}
        </Card>

        <div className="space-y-3">
          <Button onClick={handleContinue} size="lg" className="w-full">
            Continue with {recommendedPlatform.name}
          </Button>
          <Button
            onClick={handleSeeMoreOptions}
            variant="outline"
            size="lg"
            className="w-full"
          >
            See more options
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
