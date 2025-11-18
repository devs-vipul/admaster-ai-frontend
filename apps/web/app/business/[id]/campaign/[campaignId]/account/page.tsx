"use client";

import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AdAccountSelectionPage() {
  const params = useParams();
  const router = useRouter();
  const businessId = params.id as string;
  const campaignId = params.campaignId as string;
  const [accountType, setAccountType] = useState<"shown" | "link">("shown");

  function handleContinue() {
    if (accountType === "shown") {
      router.push(`/business/${businessId}/campaign/${campaignId}/account/create`);
    } else {
      router.push(`/business/${businessId}/campaign/${campaignId}/account/link`);
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Connect Your Ad Account</h1>
          <p className="text-muted-foreground">
            Choose how you want to manage your ad account
          </p>
        </div>

        <RadioGroup value={accountType} onValueChange={(value) => setAccountType(value as "shown" | "link")} className="space-y-4 mb-6">
          <Card className={`cursor-pointer transition-colors ${accountType === "shown" ? "border-primary" : ""}`}>
            <Label htmlFor="shown" className="cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="shown" id="shown" />
                  <div className="flex-1">
                    <CardTitle>I want Shown to create an ad account for me</CardTitle>
                    <CardDescription>
                      Shown will manage your ad account and optimize your campaigns
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Label>
          </Card>

          <Card className={`cursor-pointer transition-colors ${accountType === "link" ? "border-primary" : ""}`}>
            <Label htmlFor="link" className="cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="link" id="link" />
                  <div className="flex-1">
                    <CardTitle>Connect your account to Shown</CardTitle>
                    <CardDescription>
                      Link your existing ad account to Shown for management
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Label>
          </Card>
        </RadioGroup>

        <div className="flex gap-4">
          <Button onClick={() => router.back()} variant="outline">
            Back
          </Button>
          <Button onClick={handleContinue} className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

