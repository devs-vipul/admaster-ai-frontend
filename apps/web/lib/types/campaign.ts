/**
 * Campaign-related types
 */

export interface LocationArea {
  google_place_id?: string;
  name: string;
  radius?: number;
  units?: string;
  lat: number;
  lng: number;
  country_code?: string;
}

export interface ConversionGoal {
  id: number;
  name: string;
  icon: string;
}

export interface Budget {
  currency: string;
  daily_budget: number;
}

export interface BiddingStrategy {
  type: string;
  max_bid?: number;
  target_amount?: number;
  revenue_on_ad_spend?: number;
}

export interface DemographicsLanguage {
  id: string;
  text: string;
  iso: string;
}

export interface Demographics {
  languages: DemographicsLanguage[];
  locations_countries: any[];
  location_areas: LocationArea[];
}

export interface CampaignResponse {
  id: string;
  business_id: string;
  user_id: string;
  title: string;
  url: string;
  phone?: string;
  conversion_goal: ConversionGoal;
  conversion?: string;
  can_have_conversions: boolean;
  data_source: string;
  budget: Budget;
  bidding_strategy: BiddingStrategy;
  supported_bidding_strategy_types: any[];
  recommended_platform: number;
  supported_platforms: number[];
  demographics: Demographics;
  time_ranges: any[];
  time_period?: string;
  website_industry?: string;
  sitelinks: any[];
  campaigns: string[];
  metrics: any[];
  status: string;
  created_at: string;
  updated_at: string;
  is_imported?: boolean;
}

export interface CampaignListResponse {
  campaign_groups: CampaignResponse[];
  total: {
    metrics: {
      impressions: number;
      clicks: number;
      cost: string;
      conversions: number;
      click_through_rate: string;
      cost_per_click: string;
      cost_per_conversion: string;
      conversions_rate: string;
      currency: string;
    };
    budget: {
      currency: string;
      daily_budget: number;
    };
  };
  filters: {
    date_start: string;
    date_end: string;
  };
}

export interface CampaignCreateRequest {
  business_id: string;
  title: string;
  url: string;
  phone?: string;
  website_url?: string;
  language?: string;
  locations?: LocationArea[];
  advertising_goal?: string;
}

export interface Platform {
  platform_id: number;
  name: string;
  slug: string;
  type: string;
  description?: string;
  icon?: string;
  website_url?: string;
  supports_search: boolean;
  supports_display: boolean;
  supports_video: boolean;
  supports_shopping: boolean;
  supports_mobile: boolean;
  best_for_goals: string[];
  best_for_industries: string[];
  min_budget?: number;
  currency_support: string[];
  requires_own_account?: boolean;
  is_active: boolean;
  is_beta: boolean;
}
