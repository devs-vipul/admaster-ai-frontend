"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export function StepCampaignName() {
  const dispatch = useAppDispatch();
  const campaignName = useAppSelector(
    (state) => state.campaignForm.campaignName
  );
  const formData = useAppSelector((state) => state.campaignForm);

  const form = useForm<CampaignNameFormValues>({
    resolver: zodResolver(campaignNameSchema),
    defaultValues: {
      campaignName,
    },
  });

  function onSubmit(data: CampaignNameFormValues) {
    dispatch(setCampaignName(data.campaignName));
    // This is the last step - log all data
    console.log("=== Campaign Form Completed ===");
    console.log({
      advertisingGoal: formData.advertisingGoal,
      websiteUrl: formData.websiteUrl,
      language: formData.language,
      locations: formData.locations,
      campaignName: data.campaignName,
    });
    console.log("==============================");
  }

  function handleGoBack() {
    const currentValue = form.getValues("campaignName");
    dispatch(setCampaignName(currentValue));
    dispatch(previousStep());
  }

  return (
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
            <Button type="submit" size="lg" className="w-full">
              Complete
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={handleGoBack}
            >
              Go back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
