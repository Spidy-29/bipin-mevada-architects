import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AssetSkeletonProps {
    className?: string;
    aspectRatio?: "square" | "video" | "4/3" | "3/4";
}

export const AssetSkeleton = ({ className, aspectRatio = "video" }: AssetSkeletonProps) => {
    const getAspectRatioClass = () => {
        switch (aspectRatio) {
            case "square": return "aspect-square";
            case "video": return "aspect-video";
            case "4/3": return "aspect-[4/3]";
            case "3/4": return "aspect-[3/4]";
            default: return "aspect-video";
        }
    };

    return (
        <div className={cn("overflow-hidden rounded-sm", className)}>
            <Skeleton className={cn("w-full h-full", getAspectRatioClass())} />
        </div>
    );
};
