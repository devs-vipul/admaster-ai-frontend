/**
 * Error handling utilities for frontend
 * Handles API errors and formats them for display
 */

export interface ApiError {
  error: {
    message: string;
    code: string;
    status_code: number;
    details?: Record<string, unknown>;
  };
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
  type?: string;
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    typeof (error as ApiError).error === "object" &&
    "message" in (error as ApiError).error &&
    "code" in (error as ApiError).error
  );
}

export function getErrorMessage(error: unknown): string {
  if (!error) {
    return "An unknown error occurred";
  }

  // Check if it's our API error format
  if (isApiError(error)) {
    return error.error.message;
  }

  // Check if it's RTK Query error with our format
  if (
    typeof error === "object" &&
    "data" in error &&
    isApiError((error as { data: unknown }).data)
  ) {
    return (error as { data: ApiError }).data.error.message;
  }

  // Check if it's RTK Query error with detail
  if (
    typeof error === "object" &&
    "data" in error &&
    typeof (error as { data: unknown }).data === "object" &&
    (error as { data: { detail?: string } }).data?.detail
  ) {
    return (error as { data: { detail: string } }).data.detail;
  }

  // Check if it's RTK Query error with message
  if (
    typeof error === "object" &&
    "data" in error &&
    typeof (error as { data: unknown }).data === "object" &&
    (error as { data: { message?: string } }).data?.message
  ) {
    return (error as { data: { message: string } }).data.message;
  }

  // Check if it's an Error instance
  if (error instanceof Error) {
    return error.message;
  }

  // Check if it's a string
  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred";
}

export function getErrorCode(error: unknown): string | null {
  if (isApiError(error)) {
    return error.error.code;
  }

  if (
    typeof error === "object" &&
    "data" in error &&
    isApiError((error as { data: unknown }).data)
  ) {
    return (error as { data: ApiError }).data.error.code;
  }

  return null;
}

export function getErrorDetails(
  error: unknown
): Record<string, unknown> | null {
  if (isApiError(error)) {
    return error.error.details || null;
  }

  if (
    typeof error === "object" &&
    "data" in error &&
    isApiError((error as { data: unknown }).data)
  ) {
    return (error as { data: ApiError }).data.error.details || null;
  }

  return null;
}

export function getValidationErrors(
  error: unknown
): ValidationErrorDetail[] | null {
  const details = getErrorDetails(error);
  if (details && "errors" in details && Array.isArray(details.errors)) {
    return details.errors as ValidationErrorDetail[];
  }
  return null;
}

export function isNetworkError(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    return (
      "status" in error &&
      (error as { status?: string }).status === "FETCH_ERROR"
    );
  }
  return false;
}

export function isAuthError(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    const status = (error as { status?: number }).status;
    return status === 401 || status === 403;
  }

  // Check error code
  const code = getErrorCode(error);
  return code === "UNAUTHORIZED" || code === "FORBIDDEN";
}

export function isValidationError(error: unknown): boolean {
  const code = getErrorCode(error);
  return code === "VALIDATION_ERROR" || code === "VALIDATION_FAILED";
}

export function isNotFoundError(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    const status = (error as { status?: number }).status;
    return status === 404;
  }

  const code = getErrorCode(error);
  return code === "NOT_FOUND";
}

export function getErrorTitle(error: unknown): string {
  if (isNetworkError(error)) {
    return "Network Error";
  }

  if (isAuthError(error)) {
    return "Authentication Error";
  }

  if (isValidationError(error)) {
    return "Validation Error";
  }

  if (isNotFoundError(error)) {
    return "Not Found";
  }

  const code = getErrorCode(error);
  if (code) {
    return code.replace(/_/g, " ").toLowerCase();
  }

  return "Error";
}
