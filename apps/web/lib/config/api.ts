export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  ENDPOINTS: {
    // Business
    BUSINESSES: "/api/v1/businesses",
    CHECK_HAS_BUSINESS: "/api/v1/businesses/check/has-business",

    // Users
    USERS_ME: "/api/v1/users/me",
    USERS_PROFILE: "/api/v1/users/me/profile",

    // Webhooks
    CLERK_WEBHOOK: "/api/v1/webhooks/clerk",
  },
  TIMEOUT: 30000, // 30 seconds
} as const;

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
