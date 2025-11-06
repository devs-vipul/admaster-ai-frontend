import {
  BUSINESS_SIZES,
  INDUSTRIES,
  BUSINESS_STATUS,
} from "@/lib/constants/business";

export type BusinessSize = (typeof BUSINESS_SIZES)[number];

export type Industry = (typeof INDUSTRIES)[number];

export type BusinessStatus =
  (typeof BUSINESS_STATUS)[keyof typeof BUSINESS_STATUS];

export interface BusinessFormData {
  name: string;
  website: string;
  industry: Industry;
  size: BusinessSize;
}

export interface Business extends BusinessFormData {
  id: string;
  user_id: string;
  status: BusinessStatus;
  created_at: string;
  updated_at: string;
}

export interface BusinessListResponse {
  businesses: Business[];
  total: number;
}

export interface HasBusinessResponse {
  has_business: boolean;
  business_count: number;
}
