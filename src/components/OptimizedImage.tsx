import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getDriveUrlVariations } from '@/lib/driveUtils';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: 'square' | '3/4' | '4/3' | 'video';
    loading?: 'lazy' | 'eager';
    onError?: () => void;
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
    onError
}: OptimizedImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [retryCount, setRetryCount] = useState(0);

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    const handleError = () => {
        // Get all URL variations for fallback (if it's a Drive URL)
        if (src.includes('drive.google.com')) {
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

    return (
        <div className={cn('relative overflow-hidden bg-muted', aspectRatio && aspectRatioClasses[aspectRatio])}>
            {isLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
            )}

            {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="text-center p-4">
                        <svg className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs text-muted-foreground">Image failed to load</p>
                    </div>
                </div>
            ) : (
                <img
                    src={currentSrc}
                    alt={alt}
                    loading={loading}
                    onLoad={handleLoad}
                    onError={handleError}
                    className={cn(
                        'w-full h-full object-cover transition-opacity duration-300',
                        isLoading ? 'opacity-0' : 'opacity-100',
                        className
                    )}
                />
            )}
        </div>
    );
};
