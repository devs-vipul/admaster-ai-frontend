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
    const getTokenFn = getTokenGetter();
    if (getTokenFn) {
      try {
        token = (await getTokenFn()) || undefined;
      } catch (error) {
        console.error("Failed to get token:", error);
      }
    }
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
