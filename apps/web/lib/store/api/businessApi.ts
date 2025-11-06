import { baseApi } from "./baseApi";
import { API_CONFIG } from "@/lib/config/api";
import type {
  Business,
  BusinessFormData,
  BusinessListResponse,
  HasBusinessResponse,
  CrawlResponse,
} from "@/lib/types";

const authHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Check if user has any business
    checkHasBusiness: builder.query<HasBusinessResponse, string>({
      query: (token) => ({
        url: API_CONFIG.ENDPOINTS.CHECK_HAS_BUSINESS,
        ...authHeaders(token),
      }),
      providesTags: ["Business"],
    }),

    // Get all user businesses
    getUserBusinesses: builder.query<BusinessListResponse, string>({
      query: (token) => ({
        url: API_CONFIG.ENDPOINTS.BUSINESSES,
        ...authHeaders(token),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.businesses.map(({ id }) => ({
                type: "Business" as const,
                id,
              })),
              { type: "Business", id: "LIST" },
            ]
          : [{ type: "Business", id: "LIST" }],
    }),

    // Get single business
    getBusiness: builder.query<Business, { token: string; id: string }>({
      query: ({ token, id }) => ({
        url: `${API_CONFIG.ENDPOINTS.BUSINESSES}/${id}`,
        ...authHeaders(token),
      }),
      providesTags: (result, error, { id }) => [{ type: "Business", id }],
    }),

    // Create new business
    createBusiness: builder.mutation<
      Business,
      { token: string; data: BusinessFormData }
    >({
      query: ({ token, data }) => ({
        url: API_CONFIG.ENDPOINTS.BUSINESSES,
        method: "POST",
        ...authHeaders(token),
        body: data,
      }),
      invalidatesTags: [
        { type: "Business", id: "LIST" },
        { type: "Business" }, // Also invalidate has-business query
      ],
    }),

    // Update business
    updateBusiness: builder.mutation<
      Business,
      { token: string; id: string; data: Partial<BusinessFormData> }
    >({
      query: ({ token, id, data }) => ({
        url: `${API_CONFIG.ENDPOINTS.BUSINESSES}/${id}`,
        method: "PUT",
        ...authHeaders(token),
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Business", id },
        { type: "Business", id: "LIST" },
      ],
    }),

    // Delete business
    deleteBusiness: builder.mutation<void, { token: string; id: string }>({
      query: ({ token, id }) => ({
        url: `${API_CONFIG.ENDPOINTS.BUSINESSES}/${id}`,
        method: "DELETE",
        ...authHeaders(token),
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Business", id },
        { type: "Business", id: "LIST" },
      ],
    }),

    // Run crawler for a business
    crawlBusiness: builder.mutation<
      CrawlResponse,
      { token: string; id: string }
    >({
      query: ({ token, id }) => ({
        url: API_CONFIG.ENDPOINTS.BUSINESS_CRAWL(id),
        method: "POST",
        ...authHeaders(token),
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCheckHasBusinessQuery,
  useGetUserBusinessesQuery,
  useGetBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useDeleteBusinessMutation,
  useCrawlBusinessMutation,
} = businessApi;
