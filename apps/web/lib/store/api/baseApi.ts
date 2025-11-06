import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@/lib/config/api";

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

  // Extract token from the request args if provided
  let token: string | undefined;

  if (typeof args === "object" && "headers" in args) {
    const authHeader = (args.headers as Record<string, string>)?.[
      "Authorization"
    ];
    if (authHeader) {
      token = authHeader.replace("Bearer ", "");
    }
  }

  // If token is provided, add it to headers
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
  tagTypes: ["Business", "User"],
  endpoints: () => ({}),
});
