import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker
// Note: In a Vite environment, we need to point to the worker file correctly.
// We use a CDN url for simplicity and reliability across different build setups,
// effectively making this a "server-side" like resource fetch.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const usePdfThumbnail = (url: string | undefined) => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!url) {
            setThumbnailUrl(null);
            return;
        }

        let isCancelled = false;

        const generateThumbnail = async () => {
            setLoading(true);
            setError(null);

            try {
                // Determine if we can use this URL
                // PDF.js needs to be able to fetch the file (CORS)
                
                // Load the PDF
                const loadingTask = pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;

                if (isCancelled) return;

                // Fetch the first page
                const page = await pdf.getPage(1);

                if (isCancelled) return;

                // Set scale for quality (1.5 is a good balance for thumbnails)
                const viewport = page.getViewport({ scale: 1.5 });
                
                // Prepare canvas
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (!context) throw new Error('Could not get canvas context');

                // Render page to canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                
                await page.render(renderContext).promise;

                if (isCancelled) return;

                // Export to image
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                setThumbnailUrl(dataUrl);

            } catch (err: any) {
                console.warn('Error generating PDF thumbnail:', err);
                setError(err);
                
                // Fallback for Google Drive URLs: try the thumbnail endpoint
                // This is a "server-side" fallback using Google's servers
                if (url.includes('drive.google.com')) {
                    // Extract ID and cleaner logic could be here, but simpler to rely on driveUtils in the component
                    // However, we can return null to let the component handle the fallback
                }
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };

        generateThumbnail();

        return () => {
            isCancelled = true;
        };
    }, [url]);

    return { thumbnailUrl, loading, error };
};
