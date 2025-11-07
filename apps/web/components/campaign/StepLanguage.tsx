"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  languageSchema,
  type LanguageFormValues,
} from "@/lib/schemas/campaign";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  setLanguage,
  nextStep,
  previousStep,
} from "@/lib/store/slices/campaignFormSlice";
import { LANGUAGES, findLanguage } from "@/lib/constants/languages";

export function StepLanguage() {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.campaignForm.language);

  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      language,
    },
  });

  function onSubmit(data: LanguageFormValues) {
    dispatch(setLanguage(data.language));
    dispatch(nextStep());
  }

  function handleGoBack() {
    const currentValue = form.getValues("language");
    dispatch(setLanguage(currentValue));
    dispatch(previousStep());
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Which languages does your audience speak?
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>
                        {field.value ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xl">
                              {findLanguage(field.value)?.flag}
                            </span>
                            <span>{findLanguage(field.value)?.name}</span>
                          </div>
                        ) : (
                          "Select a language"
                        )}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <Button type="submit" size="lg" className="w-full">
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
