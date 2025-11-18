import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@/lib/config/api";
import { getTokenGetter } from "@/components/TokenProvider";
import { ApiError } from "@/lib/utils/error-handler";

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
  });

  let token: string | undefined;

  if (typeof args === "object" && "headers" in args) {
    const authHeader = (args.headers as Record<string, string>)?.[
      "Authorization"
    ];
    if (authHeader) {
      token = authHeader.replace("Bearer ", "");
    }
  }

  if (!token) {
    let getTokenFn = getTokenGetter();

    // Retry up to 10 times (1 second total) to wait for TokenProvider initialization
    let retries = 0;
    while (!getTokenFn && retries < 10) {
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
            "Token getter returned null - user may not be authenticated"
          );
        }
      } catch (error) {
        console.error("Failed to get token:", error);
      }
    } else {
      console.error(
        "Token getter not available after retries - TokenProvider may not be initialized"
      );
    }
  }

  if (!token) {
    const url =
      typeof args === "object" && "url" in args ? args.url : "unknown";
    console.error("No auth token available for API request. URL:", url);
    console.error("This will result in a 403 Forbidden error");
  }

  if (token && typeof args === "object") {
    args = {
      ...args,
      headers: {
        ...(args.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    };
  }

  const result = await baseQuery(args, api, extraOptions);

  // Transform error response to our format
  if (result.error) {
    const error = result.error as FetchBaseQueryError;

    // If it's a fetch error (network error)
    if (error.status === "FETCH_ERROR") {
      return {
        error: {
          status: error.status,
          data: {
            error: {
              message: "Network error. Please check your connection.",
              code: "NETWORK_ERROR",
              status_code: 0,
            },
          },
        },
      };
    }

    // If it's a parsed error response
    if (error.status && typeof error.data === "object" && error.data !== null) {
      // Check if it's already in our format
      if ("error" in error.data) {
        return {
          error: {
            status: error.status,
            data: error.data as ApiError,
          },
        };
      }

      // Transform FastAPI error format to our format
      if ("detail" in error.data) {
        return {
          error: {
            status: error.status,
            data: {
              error: {
                message:
                  typeof error.data.detail === "string"
                    ? error.data.detail
                    : "An error occurred",
                code: "API_ERROR",
                status_code:
                  typeof error.status === "number" ? error.status : 500,
              },
            },
          },
        };
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Business", "User", "Brand", "Campaign", "Platform"],
  endpoints: () => ({}),
});
