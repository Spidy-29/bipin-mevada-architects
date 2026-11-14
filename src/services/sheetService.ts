
import { ApiResponse, Asset, Project } from '../types/cms';
import { GOOGLE_SHEET_URLS } from '../lib/constants';
import { convertAssetUrlByType } from '../lib/driveUtils';

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

// In-memory cache to avoid double fetching since the API returns everything at once
let cache: ApiResponse | null = null;
let cachePromise: Promise<ApiResponse> | null = null;

const fetchFromApi = async (): Promise<ApiResponse> => {
  if (cache) return cache;
  if (cachePromise) return cachePromise;

  cachePromise = fetch(GOOGLE_SHEET_URLS.API_URL)
    .then(async (response) => {
      if (!response.ok) {
        const errorBody = await response.json().catch(() => null) as ApiErrorResponse | null;
        throw new Error(errorBody?.error || `Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json() as ApiResponse & ApiErrorResponse;
      if (data.error) {
        throw new Error(data.error);
      }
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
    // Transform URLs using smart conversion based on asset type
    return assets.map(asset => {
      // Determine the asset type for URL conversion
      const assetType = asset.asset_type === 'video' ? 'video' 
                      : asset.asset_type === 'pdf' ? 'pdf' 
                      : 'image';
      
      return {
        ...asset,
        // Convert main asset URL based on type
        asset_url: convertAssetUrlByType(asset.asset_url, assetType),
        // Convert thumbnail URL (always treat as image)
        thumbnail_url: convertAssetUrlByType(asset.thumbnail_url, 'image')
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

