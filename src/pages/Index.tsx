import Link from "next/link";
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
const frequentlyAskedQuestions = [
  {
    question: "What services does BM Design Studio offer?",
    answer: "BM Design Studio specialises in residential architecture for Ahmedabad homes, from budget-conscious residences to luxurious bungalows, and supports home renovation projects.",
  },
  {
    question: "Where is BM Design Studio located?",
    answer: "BM Design Studio is located at 508, MOUNT BIZPARK, Vaishnodevi Circle, Sardar Patel Ring Rd, near Malabar Exotica, opp. Dwarkesh Opulence, Tragad, Gujarat 382470.",
  },
  {
    question: "How can I contact BM Design Studio?",
    answer: "You can reach BM Design Studio via email at bipin@bmdesignstudio.in or design@bmdesignstudio.in, WhatsApp at +91 98253-46592, or visit our office at MOUNT BIZPARK, Vaishnodevi Circle, Ahmedabad.",
  },
];

const Index = () => {
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const { data: assets, isLoading: isLoadingAssets } = useAssets();

  const featuredProjects = projects?.filter(p => p.is_featured === true).sort((a, b) => (a.display_order ?? Number.MAX_SAFE_INTEGER) - (b.display_order ?? Number.MAX_SAFE_INTEGER)).slice(0, 8) || [];
  const galleryAssets = assets?.filter(a => a.visibility && a.asset_type === 'image').slice(0, 4) || [];

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
              alt="Residential architecture by BM Design Studio in Ahmedabad"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-2xl space-y-6 md:space-y-8">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground opacity-0 animate-fade-up">
                Residential Architecture & Design
              </p>

              <h1 className="font-serif text-display opacity-0 animate-fade-up delay-100 uppercase">
                Every Plot
                <br />
                <span className="italic normal-case block mt-2">has a Story.</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg opacity-0 animate-fade-up delay-200">
                We specialise in residential architecture, from budget-friendly homes to luxurious bungalows — creating beautiful, functional spaces tailored to how you live.
              </p>

              <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up delay-300">
                <Button variant="architectural" asChild>
                  <Link href="/portfolio" className="font-medium text-sm uppercase tracking-widest font-serif">View Portfolio</Link>
                </Button>
                <Button variant="minimal" asChild>
                  <Link href="/about" className="font-medium text-sm uppercase tracking-widest font-serif">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Featured Projects */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
                <div className="space-y-3">
                  <span className="text-overline uppercase text-muted-foreground">
                    Featured
                  </span>
                  <h2 className="font-serif text-h2">Projects</h2>
                </div>
                <Link
                  href="/projects"
                  onClick={() => window.scrollTo(0, 0)}
                  className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  View All
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="scrollbar-none flex flex-nowrap gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2 md:mx-0 md:px-0">
                {/* Dynamic Featured Projects */}
                {isLoadingProjects ? (
                  <>
                    <div className="featured-project-card snap-start"><AssetSkeleton aspectRatio="square" className="w-full" /></div>
                    <div className="featured-project-card snap-start"><AssetSkeleton aspectRatio="square" className="w-full" /></div>
                  </>
                ) : (
                  featuredProjects.map((project, index) => {
                    // Handle potential field mismatch from API due to recent refactors
                    const projectId = String(project.project_id).trim();
                    const projectTitle = project.project_title;

                    const projectAsset = assets
                      ?.filter(a => String(a.project_id ?? '').trim() === projectId && a.asset_type?.trim().toLowerCase() === 'image')
                      .sort((a, b) => (a.display_order ?? Number.MAX_SAFE_INTEGER) - (b.display_order ?? Number.MAX_SAFE_INTEGER))[0];

                    if (!projectAsset) {
                      // Skip rendering this project if no valid cover image
                      return null;
                    }

                    return (
                      <Link
                        key={projectId}
                        href={`/project/${projectId}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="featured-project-card group block opacity-0 animate-fade-up snap-start"
                        style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                      >
                        <div className="relative bg-muted/30 rounded-sm overflow-hidden">
                          <AssetDisplay
                            asset={projectAsset}
                            alt={projectTitle}
                            aspectRatio="square"
                            className="transition-transform duration-700 group-hover:scale-105"
                            showTypeIcon={false}
                          >
                            {/* Overlay container */}
                            <div className="absolute inset-0">
                              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                              {/* Project info */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                                <span className="text-xs uppercase tracking-widest text-background block">
                                  {project.property_type}
                                </span>
                                <h3 className="font-serif text-h3 text-background">
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

        {/* Gallery Preview */}
        <section className="section-container bg-card/30 backdrop-blur-[2px]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
              <div className="space-y-3">
                <span className="text-overline uppercase text-muted-foreground block">
                  Gallery
                </span>
                <h2 className="font-serif text-h2">Visual Stories</h2>
              </div>
              <Link
                href="/portfolio"
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
                galleryAssets.map((item, index) => {
                  const itemId = item.asset_id;
                  return (
                    <Link
                      key={itemId}
                      href="/portfolio"
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
                    alt="Residential interior designed by BM Design Studio"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-20 h-20 md:w-28 md:h-28 border border-line" />
              </div>

              <div className="space-y-6 order-1 lg:order-2">
                <span className="text-overline uppercase text-muted-foreground">
                  About Us
                </span>
                <h2 className="font-serif text-h2">
                  A home is not just four walls —
                  <br />
                  <span className="italic">it’s about how you live in them!</span>
                </h2>
                <div className="w-12 h-px bg-line" />
                <p className="text-muted-foreground leading-relaxed">
                  We specialise in residential architecture, from budget-friendly homes to luxurious bungalows, creating beautiful and functional spaces tailored to our clients’ needs. Every plot has a story, and we’re here to help design it right.
                </p>
                <Button variant="architectural" asChild>
                  <Link href="/about">Learn more about BM Design Studio</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-container bg-card/40">
          <div className="container">
            <header className="max-w-2xl mb-8 md:mb-12">
              <span className="text-overline uppercase text-muted-foreground">Useful Details</span>
              <h2 className="font-serif text-h2 mt-3">Frequently asked questions</h2>
            </header>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {frequentlyAskedQuestions.map(({ question, answer }) => (
                <article key={question} className="bg-card border border-border p-6 md:p-8">
                  <h3 className="font-serif text-h3 mb-3">{question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-container bg-brand text-brand-contrast">
          <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
            <div className="max-w-2xl space-y-3">
              <span className="text-overline uppercase text-brand-light">Pass it along</span>
              <h2 className="font-serif text-h2">Know someone planning to build or renovate?</h2>
              <p className="text-body-lg">Please connect them with us. Every plot has a story, and we’re here to help design it right.</p>
            </div>
            <Link
              href="/about"
              className="inline-flex shrink-0 items-center justify-center border border-brand-contrast px-6 py-3 text-sm font-medium uppercase tracking-wide text-brand-contrast transition-colors hover:bg-brand-contrast hover:text-brand"
            >
              Connect with us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
