
/**
 * Utility functions for ImageKit URL transformations
 */

interface ImageKitValidationOptions {
  strict?: boolean;
}

interface ImageKitTransformOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  dpr?: number; // Device Pixel Ratio
  blur?: number;
  crop?: 'maintain_ratio' | 'force' | 'at_max' | 'at_min';
  focus?: 'auto' | 'face' | 'center';
}

/**
 * Checks if a URL is a valid ImageKit URL
 */
export const isImageKitUrl = (url: string, options: ImageKitValidationOptions = {}): boolean => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    // Standard ImageKit domains usually end with imagekit.io
    // But users can have custom domains. 
    // Here we check for the standard domain or specific patterns if known.
    return urlObj.hostname.includes('imagekit.io');
  } catch (e) {
    return false;
  }
};

/**
 * Transforms an ImageKit URL with specified options
 * Adds auto format and quality by default
 */
export const transformImageKitUrl = (
  url: string, 
  options: ImageKitTransformOptions = {}
): string => {
  if (!isImageKitUrl(url)) {
    return url;
  }

  try {
    const urlObj = new URL(url);
    
    // Construct transformation string
    const transforms: string[] = [];

    // Default transformations for performance
    const format = options.format || 'auto';
    const quality = options.quality || 'auto';

    // Add format (f-auto)
    if (format === 'auto') transforms.push('f-auto');
    else transforms.push(`f-${format}`);

    // Add quality (q-auto) for smart compression
    if (quality === 'auto') transforms.push('q-auto');
    else transforms.push(`q-${quality}`);

    // Dimensions
    if (options.width) transforms.push(`w-${options.width}`);
    if (options.height) transforms.push(`h-${options.height}`);
    
    // Pixel Density for retina screens
    if (options.dpr) transforms.push(`dpr-${options.dpr}`);

    // Blurring (for placeholders)
    if (options.blur) transforms.push(`bl-${options.blur}`);
    
    // Cropping/Focus strategy
    if (options.focus) transforms.push(`fo-${options.focus}`);
    if (options.crop === 'maintain_ratio') transforms.push('c-maintain_ratio');

    const transformString = transforms.join(',');

    // Check if URL already has query params
    // ImageKit supports query param based transformation: ?tr=w-300,h-300
    // It also supports path based, but query param is safer for existing URLs
    
    if (transformString) {
      // Determine if we should append to existing tr param or create new
      const currentTr = urlObj.searchParams.get('tr');
      if (currentTr) {
        urlObj.searchParams.set('tr', `${currentTr},${transformString}`);
      } else {
        urlObj.searchParams.set('tr', transformString);
      }
    }

    return urlObj.toString();
  } catch (error) {
    console.warn('Error transforming ImageKit URL:', error);
    return url;
  }
};

/**
 * Generates a source set (srcset) for responsive images
 */
export const generateImageKitSrcSet = (
  url: string, 
  breakpoints: number[] = [400, 800, 1200],
  baseOptions: ImageKitTransformOptions = {}
): string => {
  if (!isImageKitUrl(url)) return '';

  return breakpoints.map(bp => {
    const transformedUrl = transformImageKitUrl(url, { ...baseOptions, width: bp });
    return `${transformedUrl} ${bp}w`;
  }).join(', ');
};
