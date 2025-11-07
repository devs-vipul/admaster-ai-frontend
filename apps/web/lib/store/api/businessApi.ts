import { baseApi } from "./baseApi";
import { API_CONFIG } from "@/lib/config/api";
import type {
  Business,
  BusinessFormData,
  BusinessListResponse,
  HasBusinessResponse,
  CrawlResponse,
} from "@/lib/types";

export const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkHasBusiness: builder.query<HasBusinessResponse, void>({
      query: () => ({
        url: API_CONFIG.ENDPOINTS.CHECK_HAS_BUSINESS,
      }),
      providesTags: ["Business"],
    }),

    getUserBusinesses: builder.query<BusinessListResponse, void>({
      query: () => ({
        url: API_CONFIG.ENDPOINTS.BUSINESSES,
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

    getBusiness: builder.query<Business, string>({
      query: (id) => ({
        url: `${API_CONFIG.ENDPOINTS.BUSINESSES}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Business", id }],
    }),

    createBusiness: builder.mutation<Business, BusinessFormData>({
      query: (data) => ({
        url: API_CONFIG.ENDPOINTS.BUSINESSES,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Business", id: "LIST" }, { type: "Business" }],
    }),

    updateBusiness: builder.mutation<
      Business,
      { id: string; data: Partial<BusinessFormData> }
    >({
      query: ({ id, data }) => ({
        url: `${API_CONFIG.ENDPOINTS.BUSINESSES}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Business", id },
        { type: "Business", id: "LIST" },
      ],
    }),

    deleteBusiness: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_CONFIG.ENDPOINTS.BUSINESSES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Business", id },
        { type: "Business", id: "LIST" },
      ],
    }),

    crawlBusiness: builder.mutation<CrawlResponse, string>({
      query: (id) => ({
        url: API_CONFIG.ENDPOINTS.BUSINESS_CRAWL(id),
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCheckHasBusinessQuery,
  useGetUserBusinessesQuery,
  useGetBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useDeleteBusinessMutation,
  useCrawlBusinessMutation,
} = businessApi;
