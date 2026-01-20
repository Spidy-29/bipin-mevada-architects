
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, ZoomIn, ZoomOut, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Asset } from '@/types/cms';
import { motion, AnimatePresence } from 'framer-motion';
import { getDriveUrlVariations } from '@/lib/driveUtils';

interface ImageViewerProps {
    isOpen: boolean;
    onClose: () => void;
    asset: Asset | null;
}

// PDF Viewer Component with error handling and fallback
const PDFViewer: React.FC<{ asset: Asset }> = ({ asset }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setHasError(false);
        setIsLoading(true);
    }, [asset.asset_url]);

    let pdfUrl = asset.asset_url;

    // Handle Google Drive URLs
    if (pdfUrl.includes('drive.google.com') && pdfUrl.includes('/view')) {
        pdfUrl = pdfUrl.replace('/view', '/preview');
    } else if (pdfUrl.includes('drive.google.com/uc')) {
        const fileIdMatch = pdfUrl.match(/id=([^&]+)/);
        if (fileIdMatch) {
            pdfUrl = `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
        }
    }

    // Handle ImageKit and other external PDF URLs
    // Some services block iframe embedding, so we'll provide a fallback
    const isImageKit = pdfUrl.includes('ik.imagekit.io');
    const isExternal = !pdfUrl.includes('drive.google.com');

    // For ImageKit, try to use a direct view URL if possible
    if (isImageKit && !pdfUrl.includes('?')) {
        // ImageKit allows direct PDF viewing, but may need transformation
        // Try the direct URL first
    }

    const handleIframeLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    // Use a timeout to detect if iframe fails to load (CORS issues)
    useEffect(() => {
        if (isImageKit || isExternal) {
            const timeout = setTimeout(() => {
                // If still loading after 5 seconds, likely a CORS/embedding issue
                if (isLoading) {
                    setHasError(true);
                    setIsLoading(false);
                }
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [isImageKit, isExternal, isLoading]);

    const openInNewTab = () => {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    };

    if (hasError) {
        return (
            <div className="w-full h-full flex items-center justify-center p-4 md:p-10">
                <div className="max-w-2xl w-full text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                            <FileText className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">PDF Preview Unavailable</h3>
                        <p className="text-sm text-muted-foreground">
                            {isImageKit
                                ? 'This PDF cannot be embedded due to security restrictions.'
                                : 'Unable to load PDF preview. Please open it in a new tab.'}
                        </p>
                    </div>
                    <Button onClick={openInNewTab} className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Open PDF in New Tab
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex items-center justify-center p-4 md:p-10 cursor-default relative" onDragStart={(e) => e.preventDefault()}>
            {isLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                    <div className="text-center">
                        <svg className="w-16 h-16 mx-auto text-muted-foreground/30 mb-2 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-sm text-muted-foreground">Loading PDF...</p>
                    </div>
                </div>
            )}
            <iframe
                src={pdfUrl}
                className="w-full h-full max-w-5xl bg-white rounded-lg shadow-2xl"
                title={asset.title || 'PDF Preview'}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{ display: isLoading ? 'none' : 'block' }}
            />
            {!isLoading && (
                <div className="absolute bottom-4 right-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={openInNewTab}
                        className="gap-2 bg-background/80 backdrop-blur-sm"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Open in New Tab
                    </Button>
                </div>
            )}
        </div>
    );
};

const ImageViewer: React.FC<ImageViewerProps> = ({ isOpen, onClose, asset }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(asset?.asset_url || '');
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

    const effectiveType = asset ? (getFileTypeFromUrl(asset.asset_url) || asset.asset_type) : null;

    // Update currentSrc when asset changes
    useEffect(() => {
        if (asset?.asset_url) {
            setCurrentSrc(asset.asset_url);
            setIsLoading(true);
            setImageError(false);
            setRetryCount(0);
            setScale(1);
            setPosition({ x: 0, y: 0 });
        }
    }, [asset?.asset_url]);

    if (!asset) return null;

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 3));
    const handleZoomOut = () => {
        setScale((prev) => {
            const newScale = Math.max(prev - 0.5, 1);
            if (newScale === 1) setPosition({ x: 0, y: 0 });
            return newScale;
        });
    };

    const resetZoom = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleImageLoad = () => {
        setIsLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        // Get all URL variations for fallback (if it's a Drive URL)
        if (asset.asset_url && asset.asset_url.includes('drive.google.com')) {
            const variations = getDriveUrlVariations(asset.asset_url);

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
        setImageError(true);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] h-[90vh] p-0 bg-background/95 border-none shadow-none flex flex-col justify-center items-center overflow-hidden">
                {/* Helper for Screen readers */}
                <DialogTitle className="sr-only">
                    Image Preview: {asset.title || 'Portfolio Image'}
                </DialogTitle>

                {/* Controls */}
                <div className="absolute top-4 right-4 z-50 flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={scale <= 1} className="bg-background/80 backdrop-blur-sm">
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={scale >= 3} className="bg-background/80 backdrop-blur-sm">
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/20 hover:text-destructive transition-colors bg-background/80 backdrop-blur-sm">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Output Container */}
                <div
                    className="w-full h-full flex items-center justify-center cursor-move overflow-hidden relative"
                    onDoubleClick={effectiveType === 'image' ? resetZoom : undefined}
                >
                    {effectiveType === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center p-4 md:p-10 cursor-default" onDragStart={(e) => e.preventDefault()}>
                            {/* Handle Google Drive Preview Link Conversion */}
                            {(() => {
                                let videoUrl = asset.asset_url;
                                // If it's a Google Drive View link, convert to preview for embedding
                                if (videoUrl.includes('drive.google.com') && videoUrl.includes('/view')) {
                                    videoUrl = videoUrl.replace('/view', '/preview');
                                }

                                return (
                                    <iframe
                                        src={videoUrl}
                                        className="w-full h-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl"
                                        title={asset.title || 'Video Preview'}
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                );
                            })()}
                        </div>
                    ) : effectiveType === 'pdf' ? (
                        <PDFViewer asset={asset} />
                    ) : (
                        <>
                            {isLoading && (
                                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 mx-auto text-muted-foreground/30 mb-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                </div>
                            )}
                            {imageError ? (
                                <div className="flex flex-col items-center justify-center text-center p-8">
                                    <svg className="w-24 h-24 text-muted-foreground/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-muted-foreground">Failed to load image</p>
                                    <p className="text-sm text-muted-foreground/70 mt-2">The image file may not be accessible</p>
                                </div>
                            ) : (
                                <motion.img
                                    src={currentSrc}
                                    alt={asset.title || asset.asset_id}
                                    className="max-h-full max-w-full object-contain transition-opacity duration-300"
                                    style={{ opacity: isLoading ? 0 : 1 }}
                                    drag={scale > 1}
                                    dragConstraints={{
                                        left: -1000 * (scale - 1),
                                        right: 1000 * (scale - 1),
                                        top: -1000 * (scale - 1),
                                        bottom: 1000 * (scale - 1),
                                    }}
                                    dragElastic={0.05}
                                    animate={{ scale, x: position.x, y: position.y }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    onDragStart={() => setIsDragging(true)}
                                    onDragEnd={() => setIsDragging(false)}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                            )}
                        </>
                    )}
                </div>

                {asset.title && (
                    <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none z-10">
                        <span className="inline-block bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                            {asset.title}
                        </span>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ImageViewer;
