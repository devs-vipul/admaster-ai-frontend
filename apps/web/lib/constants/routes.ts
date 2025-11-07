/**
 * Application route constants
 * Centralized URL management for the entire application
 */

export const ROUTES = {
  // Public routes (www)
  WWW: "/www",
  HOME: "/www",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",

  // Dashboard (main app - root)
  DASHBOARD: "/",
  DASHBOARD_ROUTE: "/dashboard",
  TIMELINE: "/timeline",

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
    OPTIMIZER: "/optimizer",
    NOTIFICATIONS: "/notifications",
  },

  // Billing (with submenus - requires business ID)
  BILLING: {
    BASE: (id: string) => `/business/${id}/settings/billing`,
    CREDIT: (id: string) => `/business/${id}/settings/billing/credits`,
    SUBSCRIPTIONS: (id: string) =>
      `/business/${id}/settings/billing/subscriptions`,
    PAYMENTS: (id: string) => `/business/${id}/settings/billing/payments`,
  },

  // Assets (with submenus - requires business ID)
  ASSETS: {
    BASE: (id: string) => `/business/${id}/assets`,
    MEDIA_GALLERY: (id: string) => `/business/${id}/assets/media`,
    COPYWRITING: (id: string) => `/business/${id}/assets/copywriting`,
    CUSTOMER_DATA: (id: string) => `/business/${id}/assets/customer-lists`,
    PRODUCT_LISTS: (id: string) => `/business/${id}/assets/customer-lists`,
  },

  // Settings (with submenus - requires business ID)
  SETTINGS: {
    BASE: (id: string) => `/business/${id}/settings`,
    GENERAL: (id: string) => `/business/${id}/settings/general`,
    INTEGRATIONS: (id: string) => `/business/${id}/settings/integrations`,
    TEAM_MEMBERS: (id: string) => `/business/${id}/settings/team-members`,
    CONVERSIONS: (id: string) => `/business/${id}/settings/conversions`,
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
