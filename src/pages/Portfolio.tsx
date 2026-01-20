import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/GridBackground";
import { useAssets } from "@/hooks/useContent";
import ImageViewer from "@/components/ImageViewer";
import { AssetCard } from "@/components/AssetCard";
import { Asset } from "@/types/cms";
import { logAnalyticsEvent } from "@/lib/firebase";

const ITEMS_PER_PAGE = 10;

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: assets, isLoading } = useAssets();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compute dynamic filters
  const uniqueWorkCategories = Array.from(new Set(assets?.map(a => a.work_category).filter(Boolean))) as string[];
  const hasVideo = assets?.some(a => a.asset_type === 'video');

  // Helper to capitalize first letter
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const filters = [
    "All",
    ...uniqueWorkCategories.map(c => capitalize(c)),
    ...(hasVideo ? ["Videos"] : [])
  ];

  const filteredItems = assets?.filter((item) => {
    if (item.visibility === 'hidden') return false;

    if (activeFilter === "All") return true;
    if (activeFilter === "Videos") return item.asset_type === "video";

    // Compare lowercase for work_category
    return item.work_category?.toLowerCase() === activeFilter.toLowerCase();
  }) || [];

  // Sort by display order
  const sortedItems = [...filteredItems].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  return (
    <div className="min-h-screen bg-background relative">
      <GridBackground />
      <Header />

      <main className="pt-24 md:pt-32 pb-section relative z-10">
        <div className="container">
          {/* Page Header */}
          <header className="max-w-2xl mb-10 md:mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3">
              Portfolio
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-light mb-4">
              Our Work
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A curated collection of architectural designs, interior projects,
              and walkthrough videos showcasing our craftsmanship.
            </p>
          </header>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12 pb-6 border-b border-border">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentPage(1);
                  logAnalyticsEvent("view_item_list", {
                    item_list_name: "Portfolio",
                    item_list_id: filter,
                  });
                }}
                className={cn(
                  "text-xs md:text-sm uppercase tracking-widest pb-1 transition-all duration-300",
                  activeFilter === filter
                    ? "text-foreground border-b border-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
                {sortedItems
                  .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                  .map((item, index) => (
                    <div key={`${item.asset_id}-${index}`} className="break-inside-avoid mb-4 md:mb-6">
                      <AssetCard
                        asset={item}
                        index={index}
                        onClick={() => {
                          setSelectedAsset(item);
                          logAnalyticsEvent("select_content", {
                            content_type: "asset",
                            content_id: item.asset_id,
                          });
                        }}
                      />
                    </div>
                  ))}
              </div>

              {/* Pagination Controls */}
              {Math.ceil(sortedItems.length / ITEMS_PER_PAGE) > 1 && (
                <div className="flex justify-center items-center gap-6 mt-12">
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-border text-xs uppercase tracking-widest hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-light text-muted-foreground">
                    Page {currentPage} of {Math.ceil(sortedItems.length / ITEMS_PER_PAGE)}
                  </span>
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.min(Math.ceil(sortedItems.length / ITEMS_PER_PAGE), p + 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={currentPage === Math.ceil(sortedItems.length / ITEMS_PER_PAGE)}
                    className="px-4 py-2 border border-border text-xs uppercase tracking-widest hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      <ImageViewer
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
      />
    </div>
  );
};

export default Portfolio;

