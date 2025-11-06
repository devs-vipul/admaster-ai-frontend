import { baseApi } from "./baseApi";
import { API_CONFIG } from "@/lib/config/api";
import type { Brand, BrandUpdate } from "@/lib/types";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get brand by business ID
    getBrandByBusiness: builder.query<Brand, string>({
      query: (businessId) => ({
        url: API_CONFIG.ENDPOINTS.BRAND_BY_BUSINESS(businessId),
      }),
      providesTags: (result, error, businessId) => [
        { type: "Brand", id: businessId },
      ],
    }),

    // Update brand
    updateBrand: builder.mutation<
      Brand,
      { businessId: string; data: BrandUpdate }
    >({
      query: ({ businessId, data }) => ({
        url: API_CONFIG.ENDPOINTS.UPDATE_BRAND(businessId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { businessId }) => [
        { type: "Brand", id: businessId },
        { type: "Business", id: businessId },
      ],
    }),

    // Mark brand as complete
    markBrandComplete: builder.mutation<Brand, string>({
      query: (businessId) => ({
        url: API_CONFIG.ENDPOINTS.MARK_BRAND_COMPLETE(businessId),
        method: "POST",
      }),
      invalidatesTags: (result, error, businessId) => [
        { type: "Brand", id: businessId },
        { type: "Business", id: businessId },
      ],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetBrandByBusinessQuery,
  useUpdateBrandMutation,
  useMarkBrandCompleteMutation,
} = brandApi;
