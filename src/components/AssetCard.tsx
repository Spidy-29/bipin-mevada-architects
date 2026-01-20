import { Play, FileText, ExternalLink } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { Asset } from '@/types/cms';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface AssetCardProps {
    asset: Asset;
    index: number;
    onClick: () => void;
}

export const AssetCard = ({ asset, index, onClick }: AssetCardProps) => {
    const aspectRatio = index % 3 === 0 ? '3/4' : index % 3 === 1 ? 'square' : '4/3';

    return (
        <div
            className="group block opacity-0 animate-fade-up cursor-pointer"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
            onClick={onClick}
        >
            <div className="relative bg-muted/30 rounded-sm overflow-hidden">
                <OptimizedImage
                    src={asset.thumbnail_url || asset.asset_url}
                    alt={asset.title || 'Portfolio Item'}
                    aspectRatio={aspectRatio}
                    className="transition-transform duration-700 group-hover:scale-105"
                    assetType={asset.asset_type}
                />

                {/* Overlay container - always positioned absolutely over the entire card */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />

                    {/* Video Play Icon - Only show on hover */}
                    {asset.asset_type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background/90 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
                                <Play size={24} className="text-foreground ml-1" fill="currentColor" />
                            </div>
                        </div>
                    )}

                    {/* PDF Document Icon - Only show on hover */}
                    {asset.asset_type === "pdf" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background/90 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
                                <FileText size={24} className="text-foreground" />
                            </div>
                        </div>
                    )}

                    {/* Hover overlay with info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-xs uppercase tracking-widest text-background/70 block">
                            {asset.work_category} {asset.year ? `• ${asset.year}` : ''}
                        </span>
                        <h3 className="font-serif text-lg text-background">{asset.title}</h3>

                        {/* Show View Project button if asset belongs to a project */}
                        {asset.project_id && (
                            <Link
                                to={`/project/${asset.project_id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 mt-2 text-xs uppercase tracking-widest text-background hover:text-background/80 transition-colors group/link"
                            >
                                <span>View Project</span>
                                <ExternalLink size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
