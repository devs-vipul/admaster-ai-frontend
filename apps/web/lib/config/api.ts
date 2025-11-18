// Validate required environment variable
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is required");
}

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    // Business
    BUSINESSES: "/api/v1/businesses",
    CHECK_HAS_BUSINESS: "/api/v1/businesses/check/has-business",
    BUSINESS_CRAWL: (id: string) => `/api/v1/businesses/${id}/crawl`,

    // Users
    USERS_ME: "/api/v1/users/me",
    USERS_PROFILE: "/api/v1/users/me/profile",

    // Webhooks
    CLERK_WEBHOOK: "/api/v1/webhooks/clerk",

    // Brands
    BRAND_BY_BUSINESS: (id: string) => `/api/v1/brands/business/${id}`,
    UPDATE_BRAND: (id: string) => `/api/v1/brands/business/${id}`,
    MARK_BRAND_COMPLETE: (id: string) =>
      `/api/v1/brands/business/${id}/complete`,

    // Campaigns
    CAMPAIGNS: "/api/v1/campaign/groups",
    CAMPAIGN_CREATE: "/api/v1/campaign/groups/create",
    CAMPAIGN_BY_ID: (id: string) => `/api/v1/campaign/groups/${id}`,

    // Platforms
    PLATFORMS: "/api/v1/platforms",
    PLATFORM_BY_ID: (id: number) => `/api/v1/platforms/${id}`,
  },
  TIMEOUT: 30000,
} as const;

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
