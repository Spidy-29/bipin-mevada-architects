/**
 * Utility functions for handling Google Drive URLs
 * Converts sharing URLs to direct access URLs for embedding in web apps
 */

/**
 * Extract file ID from various Google Drive URL formats
 * @param url - Google Drive URL (sharing link or direct link)
 * @returns File ID or null if not found
 */
export const extractDriveFileId = (url: string): string | null => {
  if (!url || !url.includes('drive.google.com')) {
    return null;
  }

  // Pattern 1: /d/FILE_ID/ (sharing URLs)
  const shareMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (shareMatch && shareMatch[1]) {
    return shareMatch[1];
  }

  // Pattern 2: id=FILE_ID (direct URLs)
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (idMatch && idMatch[1]) {
    return idMatch[1];
  }

  return null;
};

/**
 * Convert Google Drive sharing URL to direct view URL
 * Format: https://drive.google.com/uc?export=view&id=FILE_ID
 * 
 * This format works best for:
 * - Images (jpg, png, gif, etc.)
 * - Direct embedding in <img> tags
 * - Fewer CORS issues than sharing URLs
 * 
 * @param url - Google Drive sharing URL
 * @returns Direct view URL
 */
export const convertToDirectViewUrl = (url: string | undefined): string => {
  if (!url) return '';

  // If it's not a Drive URL, return as-is
  if (!url.includes('drive.google.com')) {
    return url;
  }

  // Extract file ID
  const fileId = extractDriveFileId(url);
  if (!fileId) {
    return url;
  }

  // Return direct view format
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

/**
 * Convert Google Drive sharing URL to thumbnail URL
 * Format: https://drive.google.com/thumbnail?id=FILE_ID&sz=wSIZE
 * 
 * Best for:
 * - Image thumbnails
 * - Optimized loading
 * - Specific size requirements
 * 
 * @param url - Google Drive sharing URL
 * @param size - Thumbnail size (default: 2000px width)
 * @returns Thumbnail URL
 */
export const convertToThumbnailUrl = (url: string | undefined, size: number = 2000): string => {
  if (!url) return '';

  // If it's not a Drive URL, return as-is
  if (!url.includes('drive.google.com')) {
    return url;
  }

  // Extract file ID
  const fileId = extractDriveFileId(url);
  if (!fileId) {
    return url;
  }

  // Return thumbnail format
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
};

/**
 * Convert Google Drive sharing URL to download URL
 * Format: https://drive.google.com/uc?export=download&id=FILE_ID
 * 
 * Best for:
 * - Downloading files
 * - PDFs (sometimes)
 * - Large files
 * 
 * @param url - Google Drive sharing URL
 * @returns Direct download URL
 */
export const convertToDownloadUrl = (url: string | undefined): string => {
  if (!url) return '';

  // If it's not a Drive URL, return as-is
  if (!url.includes('drive.google.com')) {
    return url;
  }

  // Extract file ID
  const fileId = extractDriveFileId(url);
  if (!fileId) {
    return url;
  }

  // Return download format
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

/**
 * Convert Google Drive sharing URL to preview/embed URL
 * Format: https://drive.google.com/file/d/FILE_ID/preview
 * 
 * Best for:
 * - Videos (in iframe)
 * - PDFs (in iframe)
 * - Document preview
 * 
 * @param url - Google Drive sharing URL
 * @returns Preview/embed URL
 */
export const convertToPreviewUrl = (url: string | undefined): string => {
  if (!url) return '';

  // If it's not a Drive URL, return as-is
  if (!url.includes('drive.google.com')) {
    return url;
  }

  // Extract file ID
  const fileId = extractDriveFileId(url);
  if (!fileId) {
    return url;
  }

  // Return preview format
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

/**
 * Smart conversion based on asset type
 * Automatically selects the best URL format based on the file type
 * 
 * @param url - Google Drive sharing URL
 * @param assetType - Type of asset ('image', 'video', 'pdf', 'other')
 * @returns Optimized URL for the asset type
 */
export const convertDriveUrlByType = (
  url: string | undefined,
  assetType: 'image' | 'video' | 'pdf' | 'other' = 'image'
): string => {
  if (!url) return '';

  // If it's not a Drive URL, return as-is
  if (!url.includes('drive.google.com')) {
    return url;
  }

  switch (assetType) {
    case 'image':
      // Use direct view for images (best compatibility)
      return convertToDirectViewUrl(url);
    
    case 'video':
      // Use preview for videos (works in iframe)
      return convertToPreviewUrl(url);
    
    case 'pdf':
      // Use preview for PDFs (works in iframe)
      return convertToPreviewUrl(url);
    
    case 'other':
    default:
      // Default to direct view
      return convertToDirectViewUrl(url);
  }
};

/** Build a public Storage URL from either a full URL or a bucket object path. */
export const getSupabasePublicUrl = (value: string | undefined): string => {
  if (!value) return '';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  const defaultBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'public-media';
  const input = value.trim();

  // Full Supabase URLs are already public URL values; convert signed object
  // paths to the public form so public buckets don't rely on expiring tokens.
  if (/^https?:\/\//i.test(input)) {
    try {
      const parsed = new URL(input);
      if (!parsed.hostname.toLowerCase().includes('supabase')) return input;
      parsed.pathname = parsed.pathname
        .replace('/storage/v1/object/sign/', '/storage/v1/object/public/')
        .replace('/storage/v1/object/authenticated/', '/storage/v1/object/public/');
      parsed.searchParams.delete('token');
      return parsed.toString();
    } catch {
      return input;
    }
  }

  if (!supabaseUrl) return input;

  // Also accept supabase://bucket/path and bucket/path values from the sheet.
  const hasExplicitBucket = /^supabase:\/\//i.test(input);
  const objectPath = input.replace(/^supabase:\/\//i, '').replace(/^\/+/, '');
  const firstSlash = objectPath.indexOf('/');
  const usesExplicitBucket = hasExplicitBucket && firstSlash > 0;
  const bucket = usesExplicitBucket ? objectPath.slice(0, firstSlash) : defaultBucket;
  const path = usesExplicitBucket ? objectPath.slice(firstSlash + 1) : objectPath;
  const encodedPath = path.split('/').map(segment => encodeURIComponent(decodeURIComponentSafe(segment))).join('/');

  return `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodedPath}`;
};

const decodeURIComponentSafe = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/** Resolve Supabase URLs/paths; convert Google Drive links as before. */
export const convertAssetUrlByType = (
  url: string | undefined,
  assetType: 'image' | 'video' | 'pdf' | 'other' = 'image'
): string => {
  if (url?.toLowerCase().includes('supabase') || url?.startsWith('supabase://')) {
    return getSupabasePublicUrl(url);
  }
  if (url && !/^https?:\/\//i.test(url) && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return getSupabasePublicUrl(url);
  }
  return convertDriveUrlByType(url, assetType);
};

/**
 * Get all URL format variations for fallback purposes
 * Returns an array of different URL formats to try
 * 
 * @param url - Google Drive sharing URL
 * @returns Array of URL variations
 */
export const getDriveUrlVariations = (url: string | undefined): string[] => {
  if (!url) return [];

  // If it's not a Drive URL, return as-is
  if (!url.includes('drive.google.com')) {
    return [url];
  }

  const fileId = extractDriveFileId(url);
  if (!fileId) {
    return [url];
  }

  return [
    // Primary: Direct view (best for images)
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    // Secondary: Thumbnail (good fallback for images)
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`,
    // Tertiary: Download (last resort)
    `https://drive.google.com/uc?export=download&id=${fileId}`,
  ];
};
