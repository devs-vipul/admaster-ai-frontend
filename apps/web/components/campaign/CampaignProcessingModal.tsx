"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CampaignProcessingModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Creating Your Campaign</DialogTitle>
          <DialogDescription>
            AdMaster AI is analyzing your campaign and finding the best ad
            platforms for you...
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground text-center">
            This may take a few moments
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
