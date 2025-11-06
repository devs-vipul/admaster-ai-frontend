"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BUSINESS_SIZES, INDUSTRIES } from "@/lib/constants";
import type { BusinessFormData } from "@/lib/types";
import { useCreateBusinessMutation } from "@/lib/store/api/businessApi";
import { getErrorMessage } from "@/lib/utils/errors";

const businessFormSchema = z.object({
  name: z
    .string()
    .min(1, "Business name is required")
    .max(200, "Business name must be less than 200 characters"),
  website: z
    .string()
    .url("Please enter a valid URL (e.g., https://example.com)")
    .min(1, "Website is required"),
  industry: z.enum(INDUSTRIES),
  size: z.enum(BUSINESS_SIZES),
});

type BusinessFormValues = z.infer<typeof businessFormSchema>;

export default function BusinessCreationPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [createBusiness, { isLoading: isSubmitting }] =
    useCreateBusinessMutation();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      name: "",
      website: "",
    },
  });

  async function onSubmit(data: BusinessFormValues) {
    setError(null);

    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const created = await createBusiness({ token, data }).unwrap();

      const createdAny = created as any;
      const id: string | undefined = createdAny?.id || createdAny?._id;
      const target = id ? `/?post-screen=onboarding&business-id=${id}` : "/";

      setTimeout(() => router.replace(target), 0);
    } catch (err) {
      console.error("Failed to create business:", err);
      setError(getErrorMessage(err));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              AdMaster AI
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's set up your first business to get started
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Business Details</h2>
            <p className="text-sm text-muted-foreground">
              Tell us about your business so we can create better ads for you
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Business Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Corider"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      The official name of your business
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Website */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website *</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://corider.in"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>Your business website URL</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Industry */}
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      What industry does your business operate in?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Size */}
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Size *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUSINESS_SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How many employees work at your business?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Business & Continue"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          You can add more businesses later from your dashboard
        </p>
      </div>
    </div>
  );
}
