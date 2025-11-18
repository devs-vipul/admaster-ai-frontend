import { baseApi } from "./baseApi";
import { API_CONFIG } from "@/lib/config/api";
import type {
  CampaignResponse,
  CampaignCreateRequest,
  CampaignListResponse,
} from "@/lib/types/campaign";

export const campaignApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCampaigns: builder.query<CampaignListResponse, void>({
      query: () => ({
        url: API_CONFIG.ENDPOINTS.CAMPAIGNS,
      }),
      providesTags: [{ type: "Campaign", id: "LIST" }],
    }),

    createCampaign: builder.mutation<CampaignResponse, CampaignCreateRequest>({
      query: (data) => ({
        url: API_CONFIG.ENDPOINTS.CAMPAIGN_CREATE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Campaign", id: "LIST" }],
    }),

    getCampaignById: builder.query<CampaignListResponse, string>({
      query: (id) => ({
        url: API_CONFIG.ENDPOINTS.CAMPAIGN_BY_ID(id),
      }),
      providesTags: (result, error, id) => [{ type: "Campaign", id }],
    }),
  }),
});

export const {
  useGetAllCampaignsQuery,
  useCreateCampaignMutation,
  useGetCampaignByIdQuery,
} = campaignApi;
