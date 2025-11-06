import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@/lib/config/api";
import { getTokenGetter } from "@/components/TokenProvider";

// Custom base query that automatically adds auth token
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Get the base query
  const baseQuery = fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
  });

  // Try to get token from args first (for backward compatibility)
  let token: string | undefined;

  if (typeof args === "object" && "headers" in args) {
    const authHeader = (args.headers as Record<string, string>)?.[
      "Authorization"
    ];
    if (authHeader) {
      token = authHeader.replace("Bearer ", "");
    }
  }

  // If no token in args, try to get it from token getter
  if (!token) {
    let getTokenFn = getTokenGetter();

    // Retry up to 3 times if token getter is not available
    let retries = 0;
    while (!getTokenFn && retries < 3) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      getTokenFn = getTokenGetter();
      retries++;
    }

    if (getTokenFn) {
      try {
        token = (await getTokenFn()) || undefined;
        if (token) {
          console.log("Token retrieved successfully for API request");
        } else {
          console.warn(
            "Token getter returned null - user may not be authenticated",
          );
        }
      } catch (error) {
        console.error("Failed to get token:", error);
      }
    } else {
      console.error(
        "Token getter not available after retries - TokenProvider may not be initialized",
      );
    }
  }

  // Debug: Log token status (only if no token)
  if (!token) {
    const url =
      typeof args === "object" && "url" in args ? args.url : "unknown";
    console.error("No auth token available for API request. URL:", url);
    console.error("This will result in a 403 Forbidden error");
  }

  // If token is available, add it to headers
  if (token && typeof args === "object") {
    args = {
      ...args,
      headers: {
        ...(args.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return baseQuery(args, api, extraOptions);
};

// Base API slice - all other API slices will extend this
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Business", "User", "Brand"],
  endpoints: () => ({}),
});
