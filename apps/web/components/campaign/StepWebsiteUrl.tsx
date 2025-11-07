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
  websiteUrlSchema,
  type WebsiteUrlFormValues,
} from "@/lib/schemas/campaign";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setWebsiteUrl, nextStep } from "@/lib/store/slices/campaignFormSlice";

export function StepWebsiteUrl() {
  const dispatch = useAppDispatch();
  const websiteUrl = useAppSelector((state) => state.campaignForm.websiteUrl);

  const form = useForm<WebsiteUrlFormValues>({
    resolver: zodResolver(websiteUrlSchema),
    defaultValues: {
      websiteUrl,
    },
  });

  function onSubmit(data: WebsiteUrlFormValues) {
    dispatch(setWebsiteUrl(data.websiteUrl));
    dispatch(nextStep());
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        What is your website URL?
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <div className="flex gap-0">
                    <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md text-muted-foreground text-sm">
                      https://
                    </div>
                    <Input
                      placeholder="corider.in"
                      {...field}
                      className="rounded-l-none"
                      onChange={(e) => {
                        const value = e.target.value.replace(
                          /^https?:\/\//,
                          ""
                        );
                        field.onChange(`https://${value}`);
                      }}
                      value={field.value.replace(/^https?:\/\//, "")}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full">
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
