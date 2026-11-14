export type AssetType = 'image' | 'video' | string;

export interface Project {
  project_id: string;
  project_title: string;
  location?: string;
  property_type?: string;
  year?: number;
  is_featured?: boolean;
  display_order?: number;
  visibility: boolean;
}

export interface Asset {
  asset_id: string | number;
  asset_type: AssetType;
  asset_url: string;
  description?: string;
  project_id?: string;
  labels?: string[];
  display_order?: number;
  visibility: boolean;
  /** Derived client-side thumbnail; not part of the Apps Script payload. */
  thumbnail_url?: string;
}

export interface ApiResponse {
  projects: Project[];
  assets: Asset[];
  meta: {
    generated_at: string;
    counts: {
      projects: number;
      assets: number;
    };
  };
}
