/**
 * Application route constants
 * Centralized URL management for the entire application
 */

export const ROUTES = {
  // Public routes
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",

  // Dashboard
  DASHBOARD: "/dashboard",

  // Business creation
  BUSINESS_CREATION: {
    BASE: "/business-creation",
    SETTINGS: "/business-creation/settings",
  },

  // Business management
  BUSINESS: {
    BASE: "/business",
    SETTINGS: (id: string) => `/business/${id}/settings`,
    INTEGRATIONS: (id: string) => `/business/${id}/settings/integrations`,
    GENERAL: (id: string) => `/business/${id}/settings/general`,
    TEAM: (id: string) => `/business/${id}/settings/team`,
  },

  // Campaigns
  CAMPAIGNS: {
    BASE: "/campaigns",
    NEW: "/campaigns/new",
    DETAIL: (id: string) => `/campaigns/${id}`,
  },

  // Monitoring
  MONITORING: {
    DASHBOARD: "/monitoring/dashboard",
    OPTIMIZER: "/monitoring/optimizer",
    NOTIFICATIONS: "/monitoring/notifications",
    BILLING: "/monitoring/billing",
    ASSETS: "/monitoring/assets",
  },
} as const;

/**
 * Helper function to build dashboard URL with query params
 */
export function buildDashboardUrl(params?: {
  postScreen?: "onboarding";
  businessId?: string;
}): string {
  if (!params) return ROUTES.DASHBOARD;

  const url = new URL(ROUTES.DASHBOARD, "http://localhost:3000");
  if (params.postScreen) {
    url.searchParams.set("post-screen", params.postScreen);
  }
  if (params.businessId) {
    url.searchParams.set("business-id", params.businessId);
  }

  return url.pathname + url.search;
}
