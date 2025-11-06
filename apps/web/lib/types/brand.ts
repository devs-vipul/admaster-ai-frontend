export interface Brand {
  id: string;
  business_id: string;
  description: string;
  logo_url?: string | null;
  brand_colors: string[];
  tone_of_voice: string[];
  language: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface BrandUpdate {
  description?: string;
  logo_url?: string | null;
  brand_colors?: string[];
  tone_of_voice?: string[];
  language?: string;
  is_complete?: boolean;
}

