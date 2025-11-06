export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
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
    MARK_BRAND_COMPLETE: (id: string) => `/api/v1/brands/business/${id}/complete`,
  },
  TIMEOUT: 30000, // 30 seconds
} as const;

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
