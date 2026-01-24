import { ExternalLink } from 'lucide-react';
import { AssetDisplay } from './AssetDisplay';
import { Asset } from '@/types/cms';
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
                <AssetDisplay
                    asset={asset}
                    alt={asset.title}
                    aspectRatio={aspectRatio}
                    className="transition-transform duration-700 group-hover:scale-105"
                    showOverlay={true}
                    showTypeIcon={true}
                >
                    {/* Hover overlay with info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                        <span className="text-xs uppercase tracking-widest text-background/70 block">
                            {asset.work_category} {asset.year ? `• ${asset.year}` : ''}
                        </span>
                        <h3 className="font-serif text-lg text-background">{asset.title}</h3>

                        {/* Show View Project button if asset belongs to a project */}
                        {asset.project_id && (
                            <Link
                                to={`/project/${asset.project_id}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="inline-flex items-center gap-2 mt-2 text-xs uppercase tracking-widest text-background hover:text-background/80 transition-colors group/link pointer-events-auto"
                            >
                                <span>View Project</span>
                                <ExternalLink size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                            </Link>
                        )}
                    </div>
                </AssetDisplay>
            </div>
        </div>
    );
};
