import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getDriveUrlVariations, convertToThumbnailUrl } from '@/lib/driveUtils';
import { usePdfThumbnail } from '@/hooks/usePdfThumbnail';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: 'square' | '3/4' | '4/3' | 'video';
    loading?: 'lazy' | 'eager';
    onError?: () => void;
    assetType?: 'image' | 'video' | 'pdf' | 'other';
}

const aspectRatioClasses = {
    'square': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    '4/3': 'aspect-[4/3]',
    'video': 'aspect-video',
};

export const OptimizedImage = ({
    src,
    alt,
    className = '',
    aspectRatio,
    loading = 'lazy',
    onError,
    assetType = 'image'
}: OptimizedImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [retryCount, setRetryCount] = useState(0);

    // Helper to check file type from URL extension
    const getFileTypeFromUrl = (url: string) => {
        if (!url) return null;
        const cleanUrl = url.split('?')[0].split('#')[0];
        const extension = cleanUrl.split('.').pop()?.toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff'].includes(extension || '')) return 'image';
        if (['mp4', 'webm', 'ogg', 'mov'].includes(extension || '')) return 'video';
        if (extension === 'pdf') return 'pdf';
        return null;
    };

    // Determine effective asset type (prop or URL)
    const effectiveAssetType = getFileTypeFromUrl(src) || assetType;

    // --- PDF Thumbnail Handling ---
    let pdfDriveThumbUrl: string | undefined = undefined;
    if (effectiveAssetType === 'pdf' && src.includes('drive.google.com')) {
        pdfDriveThumbUrl = convertToThumbnailUrl(src, 1000);
    }

    // Try generating a client-side thumbnail if it's a PDF and we don't have a drive thumb (or prefer to fallback)
    // We pass undefined if we already have a drive thumb to avoid double work, 
    // unless we want to support non-drive PDFs.
    const shouldGeneratePdfThumb = effectiveAssetType === 'pdf' && !pdfDriveThumbUrl;
    const { thumbnailUrl: generatedPdfThumb, loading: generatingPdfThumb } = usePdfThumbnail(
        shouldGeneratePdfThumb ? src : undefined
    );

    // Determine the actual image source to render
    // If PDF: use drive thumb -> generated thumb -> fallback (nothing/error)
    // If Image: use currentSrc (which might change on error/retry)
    // If Video: use currentSrc (usually fails unless video has poster, handled by fallback)
    let displaySrc = currentSrc;
    if (effectiveAssetType === 'pdf') {
        if (pdfDriveThumbUrl) displaySrc = pdfDriveThumbUrl;
        else if (generatedPdfThumb) displaySrc = generatedPdfThumb;
    }

    // If we changed sources (e.g. thumb loaded), we should reset loading state?
    // Actually, the img tag's onLoad will handle it.

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    const handleError = () => {
        // If it was a PDF drive thumb, maybe we shouldn't retry with standard image variations?
        // But let's keep the standard retry logic for 'image' types or if the PDF thumb fails.

        // Get all URL variations for fallback (if it's a Drive URL)
        if (currentSrc.includes('drive.google.com') && effectiveAssetType === 'image') {
            const variations = getDriveUrlVariations(src);

            // Try the next variation if available
            if (retryCount < variations.length - 1) {
                const nextUrl = variations[retryCount + 1];
                console.log(`Retrying with URL format ${retryCount + 1}:`, nextUrl);
                setCurrentSrc(nextUrl);
                setRetryCount(retryCount + 1);
                return;
            }
        }

        // All retries exhausted or not a Drive URL
        setIsLoading(false);
        setHasError(true);
        onError?.();
    };

    // Determine if we should attempt to render an <img> tag.
    // For PDF: YES, if we have a thumbnail URL (drive or generated).
    // For Video: NO, unless we implement video thumbs similar to PDF.
    // For Image: YES.
    const isImage = effectiveAssetType === 'image';
    const isPdfWithThumb = effectiveAssetType === 'pdf' && (!!pdfDriveThumbUrl || !!generatedPdfThumb);

    // We try to render if it's an image, OR if it's a PDF with a ready thumbnail.
    // We DO NOT render if it's a raw PDF (no thumb yet) or Video.
    const tryRenderImg = isImage || isPdfWithThumb;

    // Show fallback if:
    // 1. We tried to render and got an error.
    // 2. It's a Video (immediate fallback).
    // 3. It's a PDF but we have no thumb and are not generating one (this case shouldn't happen if hooks work, but good for safety).
    // Note: If generatingPdfThumb is true, we show loading skeleton, not fallback.
    const showFallback = hasError || (!tryRenderImg && effectiveAssetType === 'video');

    // Special loading state for PDF generation
    const showLoading = isLoading || (effectiveAssetType === 'pdf' && generatingPdfThumb && !generatedPdfThumb);

    return (
        <div className={cn('relative overflow-hidden bg-muted', aspectRatio && aspectRatioClasses[aspectRatio])}>
            {showLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
            )}

            {showFallback ? (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="text-center p-4">
                        {effectiveAssetType === 'pdf' ? (
                            <>
                                <svg className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <p className="text-xs text-muted-foreground">{hasError ? "PDF Thumbnail failed" : "PDF Document"}</p>
                            </>
                        ) : effectiveAssetType === 'video' ? (
                            <>
                                <svg className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-xs text-muted-foreground">{hasError ? "Video Thumbnail failed" : "Video"}</p>
                            </>
                        ) : (
                            <>
                                <svg className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-xs text-muted-foreground">Image failed to load</p>
                            </>
                        )}
                    </div>
                </div>
            ) : tryRenderImg && (
                <img
                    src={displaySrc}
                    alt={alt}
                    loading={loading}
                    onLoad={handleLoad}
                    onError={handleError}
                    className={cn(
                        'w-full h-full object-cover transition-opacity duration-300',
                        (isLoading || (effectiveAssetType === 'pdf' && !generatedPdfThumb && !pdfDriveThumbUrl)) ? 'opacity-0' : 'opacity-100',
                        className
                    )}
                />
            )}
        </div>
    );
};
