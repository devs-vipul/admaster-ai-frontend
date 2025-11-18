"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  campaignNameSchema,
  type CampaignNameFormValues,
} from "@/lib/schemas/campaign";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  setCampaignName,
  previousStep,
} from "@/lib/store/slices/campaignFormSlice";
import { useCreateCampaignMutation } from "@/lib/store/api/campaignApi";
import { useGetUserBusinessesQuery } from "@/lib/store/api/businessApi";
import { CampaignProcessingModal } from "./CampaignProcessingModal";

export function StepCampaignName() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const campaignName = useAppSelector(
    (state) => state.campaignForm.campaignName
  );
  const formData = useAppSelector((state) => state.campaignForm);
  const [showProcessing, setShowProcessing] = useState(false);

  // Get current business
  const { data: businessesData } = useGetUserBusinessesQuery();
  const currentBusiness = businessesData?.businesses?.[0];
  const businessId = currentBusiness?.id || (currentBusiness as any)?._id;

  const [createCampaign, { isLoading: isCreating }] =
    useCreateCampaignMutation();

  const form = useForm<CampaignNameFormValues>({
    resolver: zodResolver(campaignNameSchema),
    defaultValues: {
      campaignName,
    },
  });

  async function onSubmit(data: CampaignNameFormValues) {
    if (!businessId) {
      console.error("No business found");
      return;
    }

    dispatch(setCampaignName(data.campaignName));

    // Show processing modal
    setShowProcessing(true);

    try {
      // Call campaign creation API
      const campaignResponse = await createCampaign({
        business_id: businessId,
        title: data.campaignName,
        url: formData.websiteUrl,
        language: formData.language,
        locations: formData.locations.map((loc) => ({
          name: loc.name,
          lat: loc.lat,
          lng: loc.lng,
          country_code: loc.name.split(",").pop()?.trim(),
        })),
        advertising_goal: formData.advertisingGoal,
      }).unwrap();

      // Hide processing modal
      setShowProcessing(false);

      // Navigate to platform recommendation screen (Shown's URL pattern)
      // Format: /business/{businessId}/campaign/dynamic?campaignGroupId={campaignId}
      console.log("Campaign created successfully:", campaignResponse);
      const campaignId = campaignResponse.id || (campaignResponse as any)._id;

      if (!campaignId) {
        console.error(
          "❌ Campaign ID is missing from response:",
          campaignResponse
        );
        alert("Campaign created but ID is missing. Please check console.");
        return;
      }

      if (!businessId) {
        console.error("❌ Business ID is missing");
        return;
      }

      const targetUrl = `/business/${businessId}/campaign/dynamic?campaignGroupId=${campaignId}`;
      console.log("🚀 Navigating to:", targetUrl);
      router.push(targetUrl);
    } catch (error) {
      console.error("Failed to create campaign:", error);
      setShowProcessing(false);
      // TODO: Show error toast
    }
  }

  function handleGoBack() {
    const currentValue = form.getValues("campaignName");
    dispatch(setCampaignName(currentValue));
    dispatch(previousStep());
  }

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Campaign name
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="campaignName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Black Friday Campaign" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isCreating || !businessId}
              >
                {isCreating ? "Creating..." : "Complete"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="w-full"
                onClick={handleGoBack}
                disabled={isCreating}
              >
                Go back
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {showProcessing && (
        <CampaignProcessingModal
          open={showProcessing}
          onClose={() => setShowProcessing(false)}
        />
      )}
    </>
  );
}
