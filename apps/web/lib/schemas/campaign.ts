import * as z from "zod";

export const websiteUrlSchema = z.object({
  websiteUrl: z
    .string()
    .url("Please enter a valid URL (e.g., https://example.com)")
    .min(1, "Website URL is required"),
});

export const campaignNameSchema = z.object({
  campaignName: z
    .string()
    .min(1, "Campaign name is required")
    .max(100, "Campaign name must be less than 100 characters"),
});

export const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
});

export const locationSchema = z.object({
  locations: z
    .array(
      z.object({
        name: z.string(),
        lat: z.number(),
        lng: z.number(),
      })
    )
    .min(1, "At least one location is required"),
});

export const advertisingGoalSchema = z.object({
  advertisingGoal: z
    .enum(
      ["website-traffic", "brand-awareness", "online-leads", "online-sales"],
      {
        message: "Please select an advertising goal",
      }
    )
    .refine((val) => val !== undefined && val !== null, {
      message: "Please select an advertising goal",
    }),
});

export type WebsiteUrlFormValues = z.infer<typeof websiteUrlSchema>;
export type CampaignNameFormValues = z.infer<typeof campaignNameSchema>;
export type LanguageFormValues = z.infer<typeof languageSchema>;
export type LocationFormValues = z.infer<typeof locationSchema>;
export type AdvertisingGoalFormValues = z.infer<typeof advertisingGoalSchema>;
