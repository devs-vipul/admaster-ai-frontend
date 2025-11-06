/**
 * Error handling utilities for API errors
 */

/**
 * Extract error message from RTK Query error
 */
export function getErrorMessage(error: unknown): string {
  if (!error) {
    return "An unknown error occurred";
  }

  // RTK Query error format
  if (typeof error === "object" && "data" in error) {
    const rtkError = error as { data?: { detail?: string }; message?: string };
    if (rtkError.data?.detail) {
      return rtkError.data.detail;
    }
    if (rtkError.message) {
      return rtkError.message;
    }
  }

  // Standard Error object
  if (error instanceof Error) {
    return error.message;
  }

  // String error
  if (typeof error === "string") {
    return error;
  }

  // Fallback
  return "An unexpected error occurred";
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    return (
      "status" in error &&
      (error as { status?: string }).status === "FETCH_ERROR"
    );
  }
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    const status = (error as { status?: number }).status;
    return status === 401 || status === 403;
  }
  return false;
}
