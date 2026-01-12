import { Play, FileText } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { Asset } from '@/types/cms';
import { cn } from '@/lib/utils';

interface AssetDisplayProps {
    asset: Asset;
    alt?: string;
    aspectRatio?: 'square' | '3/4' | '4/3' | 'video';
    className?: string;
    onClick?: () => void;
    showOverlay?: boolean;
    showTypeIcon?: boolean;
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
}: AssetDisplayProps) => {
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
            />

            {/* Overlay and Icons */}
            {(showOverlay || showTypeIcon) && (
                <div className="absolute inset-0">
                    {/* Hover overlay */}
                    {showOverlay && (
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
                    )}

                    {/* Video Play Icon - Only show on hover */}
                    {showTypeIcon && asset.asset_type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background/90 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
                                <Play size={24} className="text-foreground ml-1" fill="currentColor" />
                            </div>
                        </div>
                    )}

                    {/* PDF Document Icon - Only show on hover */}
                    {showTypeIcon && asset.asset_type === "pdf" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background/90 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
                                <FileText size={24} className="text-foreground" />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
