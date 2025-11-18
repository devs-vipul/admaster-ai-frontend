/**
 * Hook for displaying error toasts using Sonner
 */
import { toast } from "sonner";
import {
  getErrorMessage,
  getErrorTitle,
  isNetworkError,
  isAuthError,
  isValidationError,
  getValidationErrors,
} from "@/lib/utils/error-handler";

export function useToastError() {
  const showError = (error: unknown) => {
    const title = getErrorTitle(error);
    const message = getErrorMessage(error);

    // Handle validation errors with field details
    if (isValidationError(error)) {
      const validationErrors = getValidationErrors(error);
      if (validationErrors && validationErrors.length > 0) {
        const fieldErrors = validationErrors
          .map((err) => `${err.field}: ${err.message}`)
          .join(", ");
        toast.error(title, {
          description: fieldErrors,
          duration: 5000,
        });
        return;
      }
    }

    // Handle network errors
    if (isNetworkError(error)) {
      toast.error(title, {
        description: message,
        duration: 5000,
        action: {
          label: "Retry",
          onClick: () => window.location.reload(),
        },
      });
      return;
    }

    // Handle auth errors
    if (isAuthError(error)) {
      toast.error(title, {
        description: message,
        duration: 5000,
      });
      return;
    }

    // Default error toast
    toast.error(title, {
      description: message,
      duration: 5000,
    });
  };

  const showSuccess = (message: string, title?: string) => {
    toast.success(title || "Success", {
      description: message,
      duration: 3000,
    });
  };

  const showInfo = (message: string, title?: string) => {
    toast.info(title || "Info", {
      description: message,
      duration: 3000,
    });
  };

  const showWarning = (message: string, title?: string) => {
    toast.warning(title || "Warning", {
      description: message,
      duration: 4000,
    });
  };

  return {
    showError,
    showSuccess,
    showInfo,
    showWarning,
  };
}

