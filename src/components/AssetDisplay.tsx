import { Play, FileText } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { Asset } from '@/types/cms';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AssetDisplayProps {
    asset: Asset;
    alt?: string;
    aspectRatio?: 'square' | '3/4' | '4/3' | 'video';
    className?: string;
    onClick?: () => void;
    showOverlay?: boolean;
    showTypeIcon?: boolean;
    children?: ReactNode;
}

/**
 * Reusable component for displaying assets (images, videos, PDFs) with consistent behavior
 * - Shows thumbnail/image with loading states
 * - Shows type-specific icon on hover (video play button, PDF icon)
 * - Supports click interaction
 * - Consistent styling across all pages
 */
export const AssetDisplay = ({
    asset,
    alt,
    aspectRatio = 'video',
    className = '',
    onClick,
    showOverlay = true,
    showTypeIcon = true,
    children,
}: AssetDisplayProps) => {
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

    const effectiveType = getFileTypeFromUrl(asset.asset_url) || asset.asset_type;

    return (
        <div
            className={cn(
                'group relative cursor-pointer overflow-hidden bg-muted/30 rounded-sm',
                className
            )}
            onClick={onClick}
        >
            {/* Image/Thumbnail */}
            <OptimizedImage
                src={asset.thumbnail_url || asset.asset_url}
                alt={alt || asset.title || 'Asset'}
                aspectRatio={aspectRatio}
                className="transition-transform duration-700 group-hover:scale-105"
                assetType={effectiveType as any}
            />

            {/* Overlay and Icons */}
            {(showOverlay || showTypeIcon || children) && (
                <div className="absolute inset-0">
                    {/* Hover overlay */}
                    {showOverlay && (
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
                    )}

                    {/* Video Play Icon - Only show on hover */}
                    {showTypeIcon && effectiveType === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background/90 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
                                <Play size={24} className="text-foreground ml-1" fill="currentColor" />
                            </div>
                        </div>
                    )}

                    {/* PDF Document Icon - Only show on hover */}
                    {showTypeIcon && effectiveType === "pdf" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background/90 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
                                <FileText size={24} className="text-foreground" />
                            </div>
                        </div>
                    )}

                    {/* Custom Content (e.g. text overlays) */}
                    {children}
                </div>
            )}
        </div>
    );
};
