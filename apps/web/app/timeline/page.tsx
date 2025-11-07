"use client";

import { useState } from "react";
import Image from "next/image";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardRedirect } from "@/components/dashboard-redirect";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  resetForm,
  setAdvertisingGoal,
  nextStep,
} from "@/lib/store/slices/campaignFormSlice";
import { StepWebsiteUrl } from "@/components/campaign/StepWebsiteUrl";
import { StepCampaignName } from "@/components/campaign/StepCampaignName";
import { StepLanguage } from "@/components/campaign/StepLanguage";
import { StepLocation } from "@/components/campaign/StepLocation";
import { StepAdvertisingGoal } from "@/components/campaign/StepAdvertisingGoal";

const TIMELINE_STEPS = [
  {
    id: 1,
    title: "Create business",
    status: "done" as const,
    description: "Your business was created correctly.",
  },
  {
    id: 2,
    title: "Create your first campaign",
    status: "active" as const,
    description: "Start growing your business & launch your first ads.",
  },
  {
    id: 3,
    title: "Install our pixel",
    status: "pending" as const,
    description: "",
  },
  {
    id: 4,
    title: "Define business success",
    status: "pending" as const,
    description: "",
  },
];

export default function TimelinePage() {
  const dispatch = useAppDispatch();
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const { currentStep } = useAppSelector((state) => state.campaignForm);

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

  const handleCreateCampaign = () => {
    dispatch(resetForm());
    setShowCampaignForm(true);
  };

  const handleCloseCampaignForm = () => {
    setShowCampaignForm(false);
    dispatch(resetForm());
  };

  return (
    <DashboardRedirect>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Getting started</h1>
          </div>

          {/* Progress Bar - Only show when form is NOT open */}
          {!showCampaignForm && (
            <div className="flex items-center gap-4 max-w-4xl">
              {TIMELINE_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-3 flex-1">
                    {/* Step Circle */}
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-semibold ${
                        step.status === "done"
                          ? "bg-green-500 text-white"
                          : step.status === "active"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {step.status === "done" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>

                    {/* Step Label */}
                    <span
                      className={`text-sm font-medium ${
                        step.status === "done"
                          ? "line-through text-muted-foreground"
                          : step.status === "active"
                            ? "text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {/* Connector Line */}
                  {index < TIMELINE_STEPS.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${
                        step.status === "done" ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div
            className={
              showCampaignForm
                ? "flex justify-center"
                : "grid lg:grid-cols-2 gap-8"
            }
          >
            {/* Left: Current Step Details or Form */}
            {showCampaignForm ? (
              <div className="space-y-6 w-full max-w-3xl">
                {/* Progress Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {currentStep} of 5
                    </span>
                    <button
                      onClick={handleCloseCampaignForm}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Close
                    </button>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(currentStep / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Form Step */}
                <div>{renderStep()}</div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Create your first campaign
                  </h2>
                  <p className="text-muted-foreground">
                    Start growing your business & launch your first ads.
                  </p>
                </div>

                {/* Status Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">
                    What&apos;s the status?
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white flex-shrink-0">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">
                          <span className="text-green-600 dark:text-green-400 text-sm font-semibold mr-2">
                            DONE
                          </span>
                          Your business was created correctly.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-card border rounded-lg">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-300 text-gray-600 flex-shrink-0">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          You reviewed the brand assets Shown AI generated.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-card border rounded-lg">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-300 text-gray-600 flex-shrink-0">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Shown is analyzing your business further for insights.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What Happens Next */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">What happens next?</h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-card border rounded-lg">
                      <div className="text-2xl">⚡</div>
                      <p className="text-muted-foreground">
                        Shown will assist with your first campaign.
                      </p>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-card border rounded-lg">
                      <div className="text-2xl">🎯</div>
                      <p className="text-muted-foreground">
                        Our AI will suggest the best ad platform(s) based on
                        your business.
                      </p>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-card border rounded-lg">
                      <div className="text-2xl">🎨</div>
                      <p className="text-muted-foreground">
                        Your ads & targeting will be created automatically for
                        your review.
                      </p>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-card border rounded-lg">
                      <div className="text-2xl">💰</div>
                      <p className="text-muted-foreground">
                        You&apos;ll select a daily ad budget to start.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleCreateCampaign}
                >
                  Create campaign
                </Button>
              </div>
            )}

            {/* Right: Illustration - Only show when form is NOT open */}
            {!showCampaignForm && (
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-md aspect-square">
                  <Image
                    src="https://app.shown.io/static/webp/getting-started-step-illustration-campaign-BwF98fRk.webp"
                    alt="Campaign creation illustration"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </DashboardRedirect>
  );
}
