import { baseApi } from "./baseApi";
import { API_CONFIG } from "@/lib/config/api";
import type { Platform } from "@/lib/types/campaign";

export const platformApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlatforms: builder.query<Platform[], void>({
      query: () => ({
        url: API_CONFIG.ENDPOINTS.PLATFORMS,
      }),
      providesTags: ["Platform"],
    }),

    getPlatformById: builder.query<Platform, number>({
      query: (id) => ({
        url: API_CONFIG.ENDPOINTS.PLATFORM_BY_ID(id),
      }),
      providesTags: (result, error, id) => [{ type: "Platform", id }],
    }),
  }),
});

export const { useGetPlatformsQuery, useGetPlatformByIdQuery } = platformApi;
