import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/GridBackground";
import { useAssets, useProjects } from "@/hooks/useContent";
import { AssetDisplay } from "@/components/AssetDisplay";
import { AssetSkeleton } from "@/components/AssetSkeleton";

// Assets are loaded from public folder (Keep hero image static for now or make it dynamic if desired)
const heroImage = "/images/1.jpg";
const projectLiving = "/images/5.jpg";

const Index = () => {
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const { data: assets, isLoading: isLoadingAssets } = useAssets();

  // Robust check for is_featured, handling boolean, string "true", or number 1
  // Robust check for is_featured, handling boolean, string "true"/"TRUE", or number 1
  const isFeatured = (val: any) => {
    if (val === true) return true;
    if (val === 1) return true;
    if (typeof val === 'string') return val.toLowerCase() === 'true';
    return false;
  };

  const featuredProjects = projects?.filter(p => isFeatured(p.is_featured) || isFeatured((p as any).isFeatured)).slice(0, 4) || [];
  const featuredAssets = assets?.filter(a => isFeatured(a.is_featured) || isFeatured((a as any).isFeatured)).slice(0, 8) || [];

  return (
    <div className="min-h-screen bg-background relative">
      <GridBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-end pb-12 md:pb-20 relative">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Modern architectural interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-2xl space-y-6 md:space-y-8">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground opacity-0 animate-fade-up">
                Architecture & Interior Design
              </p>

              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] opacity-0 animate-fade-up delay-100 uppercase">
                Structure
                <br />
                <span className="italic normal-case block mt-2">& Silence.</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg opacity-0 animate-fade-up delay-200">
                We create timeless architecture and interiors that honor both
                function and beauty, crafting spaces that inspire.
              </p>

              <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up delay-300">
                <Button variant="architectural" asChild>
                  <Link to="/portfolio">View Portfolio</Link>
                </Button>
                <Button variant="minimal" asChild>
                  <Link to="/about">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Featured Projects */}
        {!isLoadingProjects && featuredProjects.length === 0 ? null : (
          <section className="section-container bg-background/30 backdrop-blur-[2px]">
            <div className="container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Featured
                  </span>
                  <h2 className="font-serif text-2xl md:text-4xl font-light">Selected Projects</h2>
                </div>
                <Link
                  to="/projects"
                  onClick={() => window.scrollTo(0, 0)}
                  className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  View All
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Dynamic Featured Projects */}
                {isLoadingProjects ? (
                  <>
                    <div className="bg-muted/30 rounded-sm overflow-hidden aspect-[4/3]"><AssetSkeleton aspectRatio="4/3" className="w-full h-full" /></div>
                    <div className="bg-muted/30 rounded-sm overflow-hidden aspect-[4/3]"><AssetSkeleton aspectRatio="4/3" className="w-full h-full" /></div>
                  </>
                ) : (
                  featuredProjects.map((project, index) => {
                    // Handle potential field mismatch from API due to recent refactors
                    const projectId = project.project_id || (project as any).id;
                    const projectTitle = project.project_title || (project as any).title;
                    const propertyType = project.property_type || (project as any).propertyType;

                    // Find the first image asset for this project
                    const projectAsset = assets?.find(a => {
                      const assetProjectId = a.project_id || (a as any).projectId;
                      const assetType = a.asset_type || (a as any).type;
                      // Loose equality check for ID in case of string vs number
                      return assetProjectId == projectId && assetType === 'image';
                    });

                    if (!projectAsset) {
                      // Skip rendering this project if no valid cover image
                      return null;
                    }

                    return (
                      <Link
                        key={projectId}
                        to={`/project/${projectId}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="group block opacity-0 animate-fade-up"
                        style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                      >
                        <div className="relative bg-muted/30 rounded-sm overflow-hidden">
                          <AssetDisplay
                            asset={projectAsset}
                            alt={projectTitle}
                            aspectRatio="4/3"
                            className="transition-transform duration-700 group-hover:scale-105"
                            showTypeIcon={false}
                          >
                            {/* Overlay container */}
                            <div className="absolute inset-0">
                              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                              {/* Project info */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                                <span className="text-xs uppercase tracking-widest text-background/80 block">
                                  {propertyType}
                                </span>
                                <h3 className="font-serif text-lg md:text-xl text-background">
                                  {projectTitle}
                                </h3>
                              </div>
                            </div>
                          </AssetDisplay>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        )}

        {/* Gallery Preview */}
        <section className="section-container bg-card/30 backdrop-blur-[2px]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block">
                  Gallery
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-light">Visual Stories</h2>
              </div>
              <Link
                to="/portfolio"
                onClick={() => window.scrollTo(0, 0)}
                className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                View All
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {isLoadingAssets ? (
                <>
                  {[...Array(4)].map((_, i) => (
                    <AssetSkeleton key={i} aspectRatio="square" />
                  ))}
                </>
              ) : (
                // Limit to 4 items
                featuredAssets.slice(0, 4).map((item, index) => {
                  const itemId = item.asset_id || (item as any).id;
                  return (
                    <Link
                      key={itemId}
                      to="/portfolio"
                      onClick={() => window.scrollTo(0, 0)}
                      className="opacity-0 animate-fade-up"
                      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                    >
                      <AssetDisplay
                        asset={item}
                        alt="Gallery item"
                        aspectRatio="square"
                      />
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </section>


        {/* About Preview */}
        <section className="section-container bg-background/30 backdrop-blur-[2px]">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="overflow-hidden">
                  <img
                    src={projectLiving}
                    alt="Our work"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-20 h-20 md:w-28 md:h-28 border border-line" />
              </div>

              <div className="space-y-6 order-1 lg:order-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  About Us
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-light">
                  Crafting spaces with
                  <br />
                  <span className="italic">purpose & beauty</span>
                </h2>
                <div className="w-12 h-px bg-line" />
                <p className="text-muted-foreground leading-relaxed">
                  With a passion for thoughtful design, we create architecture and
                  interiors that stand the test of time. Every project is an
                  opportunity to craft something meaningful.
                </p>
                <Button variant="architectural" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
