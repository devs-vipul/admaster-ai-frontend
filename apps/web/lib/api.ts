import type {
  BusinessFormData,
  Business,
  BusinessListResponse,
  HasBusinessResponse,
} from "@/lib/types";
import { API_CONFIG, getApiUrl } from "@/lib/config/api";

export async function createBusiness(
  token: string,
  data: BusinessFormData,
): Promise<Business> {
  const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.BUSINESSES), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create business");
  }

  return response.json();
}

export async function checkHasBusiness(
  token: string,
): Promise<HasBusinessResponse> {
  const response = await fetch(
    getApiUrl(API_CONFIG.ENDPOINTS.CHECK_HAS_BUSINESS),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to check business status");
  }

  return response.json();
}

export async function getUserBusinesses(
  token: string,
): Promise<BusinessListResponse> {
  const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.BUSINESSES), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch businesses");
  }

  return response.json();
}
