
import { Asset, Project } from '../types/cms';
import { GOOGLE_SHEET_URLS } from '../lib/constants';
import { convertDriveUrlByType } from '../lib/driveUtils';

interface ApiResponse {
  assets: Asset[];
  projects: Project[];
  meta: {
    generated_at: string;
    asset_count: number;
    project_count: number;
  };
  error?: string;
  message?: string;
}

// In-memory cache to avoid double fetching since the API returns everything at once
let cache: ApiResponse | null = null;
let cachePromise: Promise<ApiResponse> | null = null;

const fetchFromApi = async (): Promise<ApiResponse> => {
  if (cache) return cache;
  if (cachePromise) return cachePromise;

  // Validate API configuration
  if (!GOOGLE_SHEET_URLS.API_URL || !GOOGLE_SHEET_URLS.API_KEY) {
    const error = new Error('API configuration is missing. Please check your environment variables.');
    console.error('API Configuration Error:', error);
    throw error;
  }

  const url = `${GOOGLE_SHEET_URLS.API_URL}?key=${encodeURIComponent(GOOGLE_SHEET_URLS.API_KEY)}`;

  cachePromise = fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("api response : ",data);
      cache = data;
      return data;
    })
    .catch((error) => {
      console.error('API Fetch Error:', error);
      cachePromise = null; // Reset promise on error so we can try again
      throw error;
    });

  return cachePromise;
};

export const fetchAssets = async (): Promise<Asset[]> => {
  try {
    const data = await fetchFromApi();
    const assets = data.assets || [];
    console.log("assets from  fetchAssets : ",assets)
    // Transform URLs using smart conversion based on asset type
    return assets.map(asset => {
      // Determine the asset type for URL conversion
      const assetType = asset.asset_type === 'video' ? 'video' 
                      : asset.asset_type === 'pdf' ? 'pdf' 
                      : 'image';
      
      return {
        ...asset,
        // Convert main asset URL based on type
        asset_url: convertDriveUrlByType(asset.asset_url, assetType),
        // Convert thumbnail URL (always treat as image)
        thumbnail_url: convertDriveUrlByType(asset.thumbnail_url, 'image')
      };
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    return [];
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const data = await fetchFromApi();
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

