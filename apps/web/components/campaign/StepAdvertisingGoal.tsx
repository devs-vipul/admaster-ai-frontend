"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MousePointer, Eye, Users, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  advertisingGoalSchema,
  type AdvertisingGoalFormValues,
} from "@/lib/schemas/campaign";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  setAdvertisingGoal,
  previousStep,
} from "@/lib/store/slices/campaignFormSlice";

const ADVERTISING_GOALS = [
  {
    id: "website-traffic" as const,
    icon: MousePointer,
    title: "Website Traffic",
    description:
      "Drive more visitors to your website to boost online visibility & engagement.",
  },
  {
    id: "brand-awareness" as const,
    icon: Eye,
    title: "Brand Awareness",
    description:
      "Enhance your brand's visibility and reputation to build long-term customer loyalty.",
  },
  {
    id: "online-leads" as const,
    icon: Users,
    title: "Online Leads",
    description: "Capture new leads on your website & grow your client base.",
    badge: "Conversion setup required",
  },
  {
    id: "online-sales" as const,
    icon: ShoppingCart,
    title: "Online Sales",
    description:
      "Increase your e-commerce sales by driving targeted traffic to your online store.",
    badge: "Conversion setup required",
  },
];

interface StepAdvertisingGoalProps {
  onComplete: (data: AdvertisingGoalFormValues) => void;
}

export function StepAdvertisingGoal({ onComplete }: StepAdvertisingGoalProps) {
  const dispatch = useAppDispatch();
  const advertisingGoal = useAppSelector(
    (state) => state.campaignForm.advertisingGoal
  );

  const form = useForm<AdvertisingGoalFormValues>({
    resolver: zodResolver(advertisingGoalSchema),
    defaultValues: {
      advertisingGoal: advertisingGoal || undefined,
    },
  });

  function onSubmit(data: AdvertisingGoalFormValues) {
    dispatch(setAdvertisingGoal(data.advertisingGoal));
    onComplete(data);
  }

  function handleGoBack() {
    const currentValue = form.getValues("advertisingGoal");
    if (currentValue) {
      dispatch(setAdvertisingGoal(currentValue));
    }
    dispatch(previousStep());
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        What is your advertising goal?
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="advertisingGoal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid gap-4">
                    {ADVERTISING_GOALS.map((goal) => {
                      const Icon = goal.icon;
                      const isSelected = field.value === goal.id;

                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => field.onChange(goal.id)}
                          className={cn(
                            "relative text-left p-6 rounded-lg border-2 transition-all hover:border-primary/50",
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card"
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={cn(
                                "p-3 rounded-lg",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              )}
                            >
                              <Icon className="h-6 w-6" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">
                                  {goal.title}
                                </h3>
                                {goal.badge && (
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center">
                                      <span className="text-[10px]">i</span>
                                    </div>
                                    <span>{goal.badge}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {goal.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
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
              disabled={!form.watch("advertisingGoal")}
            >
              Next
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
