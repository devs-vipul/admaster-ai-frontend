"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  resetForm,
  setAdvertisingGoal,
  nextStep,
  setCurrentStep,
} from "@/lib/store/slices/campaignFormSlice";
import { StepWebsiteUrl } from "@/components/campaign/StepWebsiteUrl";
import { StepCampaignName } from "@/components/campaign/StepCampaignName";
import { StepLanguage } from "@/components/campaign/StepLanguage";
import { StepLocation } from "@/components/campaign/StepLocation";
import { StepAdvertisingGoal } from "@/components/campaign/StepAdvertisingGoal";
import { useGetUserBusinessesQuery } from "@/lib/store/api/businessApi";
import { useGetCampaignByIdQuery } from "@/lib/store/api/campaignApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Sparkles, Info } from "lucide-react";
import { useMemo } from "react";
import { useGetPlatformsQuery } from "@/lib/store/api/platformApi";
import type { Platform } from "@/lib/types/campaign";
import { Button } from "@/components/ui/button";

export default function CampaignDynamicPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessId = params.id as string;
  const campaignGroupId = searchParams.get("campaignGroupId");

  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.campaignForm);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [selectedPlatformId, setSelectedPlatformId] = useState<number | null>(
    null
  );

  // Get current business
  const { data: businessesData } = useGetUserBusinessesQuery();
  const currentBusiness = businessesData?.businesses?.find(
    (b) => b.id === businessId || (b as any)._id === businessId
  );

  // If campaignGroupId exists, show platform recommendation page
  const {
    data: campaignListResponse,
    isLoading: campaignLoading,
    error: campaignError,
  } = useGetCampaignByIdQuery(campaignGroupId || "", {
    skip: !campaignGroupId,
  });

  const campaign = campaignListResponse?.campaign_groups?.[0];

  const { data: platforms, isLoading: platformsLoading } =
    useGetPlatformsQuery();

  const recommendedPlatformId = campaign?.recommended_platform ?? 0;
  const supportedPlatformIds = campaign?.supported_platforms ?? [];

  const recommendedPlatform = useMemo(() => {
    return platforms?.find((p) => p.platform_id === recommendedPlatformId);
  }, [platforms, recommendedPlatformId]);

  const allPlatforms = useMemo(() => {
    if (!platforms) return [];
    return platforms.filter((p) =>
      supportedPlatformIds.includes(p.platform_id)
    );
  }, [platforms, supportedPlatformIds]);

  useEffect(() => {
    if (!campaignGroupId) {
      const step = searchParams.get("step");
      if (step) {
        dispatch(setCurrentStep(parseInt(step, 10)));
      }
    }
  }, [searchParams, dispatch, campaignGroupId]);

  if (campaignGroupId) {
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

    if (campaignError || !recommendedPlatform) {
      return (
        <DashboardLayout>
          <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="text-center">
              <p className="text-muted-foreground">
                {campaignError
                  ? "Failed to load campaign"
                  : "No platform recommendations available"}
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
                  onClick={() => setSelectedPlatformId(platform.platform_id)}
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
              <Button
                onClick={() => setShowMoreOptions(false)}
                variant="outline"
              >
                Go back
              </Button>
              <Button
                onClick={() =>
                  router.push(
                    `/business/${businessId}/campaign/${campaignGroupId}/account`
                  )
                }
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
              <CardDescription>
                {recommendedPlatform.description}
              </CardDescription>
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
            <Button
              onClick={() =>
                router.push(
                  `/business/${businessId}/campaign/${campaignGroupId}/account`
                )
              }
              size="lg"
              className="w-full"
            >
              Continue with {recommendedPlatform.name}
            </Button>
            <Button
              onClick={() => setShowMoreOptions(true)}
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

  // Campaign form view (no campaignGroupId)
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepAdvertisingGoal
            onComplete={(data) => {
              dispatch(setAdvertisingGoal(data.advertisingGoal));
              dispatch(nextStep());
            }}
          />
        );
      case 2:
        return <StepWebsiteUrl />;
      case 3:
        return <StepLanguage />;
      case 4:
        return <StepLocation />;
      case 5:
        return <StepCampaignName />;
      default:
        return (
          <StepAdvertisingGoal
            onComplete={(data) => {
              dispatch(setAdvertisingGoal(data.advertisingGoal));
              dispatch(nextStep());
            }}
          />
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-3xl">{renderStep()}</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
