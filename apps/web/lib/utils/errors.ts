export function getErrorMessage(error: unknown): string {
  if (!error) {
    return "An unknown error occurred";
  }

  if (typeof error === "object" && "data" in error) {
    const rtkError = error as { data?: { detail?: string }; message?: string };
    if (rtkError.data?.detail) {
      return rtkError.data.detail;
    }
    if (rtkError.message) {
      return rtkError.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred";
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
  return false;
}
