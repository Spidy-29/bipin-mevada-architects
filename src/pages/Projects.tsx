import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/GridBackground";
import { useProjects, useAssets } from "@/hooks/useContent";
import { AssetDisplay } from "@/components/AssetDisplay";



const ITEMS_PER_PAGE = 10;

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [currentPage, setCurrentPage] = useState(1);
    const { data: projects, isLoading: isLoadingProjects } = useProjects();
    const { data: assets } = useAssets();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const allFilters = ["All", ...Array.from(new Set(projects?.map((p) => p.property_type).filter(Boolean)))];

    const filteredProjects = projects?.filter((project) => {
        if (project.visibility === 'hidden') return false;

        if (activeFilter === "All") return true;
        return project.property_type === activeFilter;
    }) || [];

    return (
        <div className="min-h-screen bg-background relative">
            <GridBackground />
            <Header />

            <main className="pt-24 md:pt-32 pb-section relative z-10">
                <div className="container">
                    {/* Page Header */}
                    <header className="max-w-2xl mb-10 md:mb-16">
                        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3">
                            Projects
                        </span>
                        <h1 className="font-serif text-3xl md:text-5xl font-light mb-4">
                            All Projects
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            Explore our complete collection of architectural and interior design projects,
                            each crafted with precision and care.
                        </p>
                    </header>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12 pb-6 border-b border-border">
                        {allFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => {
                                    setActiveFilter(filter as string);
                                    setCurrentPage(1);
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

                    {/* Projects Grid */}
                    {isLoadingProjects ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredProjects.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {filteredProjects
                                    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                                    .map((project, index) => {
                                        // Find the first image asset for this project
                                        const projectAsset = assets?.find(
                                            (a) => a.project_id === project.project_id && a.asset_type === "image"
                                        );

                                        if (!projectAsset) return null; // Skip if no image found

                                        return (
                                            <Link
                                                key={project.project_id}
                                                to={`/project/${project.project_id}`}
                                                onClick={() => window.scrollTo(0, 0)}
                                                className="group block opacity-0 animate-fade-up"
                                                style={{
                                                    animationDelay: `${index * 100}ms`,
                                                    animationFillMode: "forwards",
                                                }}
                                            >
                                                <div className="relative bg-muted/30 rounded-sm overflow-hidden">
                                                    <AssetDisplay
                                                        asset={projectAsset}
                                                        alt={project.project_title}
                                                        aspectRatio="4/3"
                                                        className="transition-transform duration-700 group-hover:scale-105"
                                                        showTypeIcon={false}
                                                    />

                                                    {/* Overlay container */}
                                                    <div className="absolute inset-0">
                                                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                        {/* Project info */}
                                                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                            <span className="text-xs uppercase tracking-widest text-background/80">
                                                                {project.property_type}
                                                            </span>
                                                            <h3 className="font-serif text-lg md:text-xl text-background">
                                                                {project.project_title}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                            </div>

                            {/* Pagination Controls */}
                            {Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) > 1 && (
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
                                        Page {currentPage} of {Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)}
                                    </span>
                                    <button
                                        onClick={() => {
                                            setCurrentPage((p) => Math.min(Math.ceil(filteredProjects.length / ITEMS_PER_PAGE), p + 1));
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                        disabled={currentPage === Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)}
                                        className="px-4 py-2 border border-border text-xs uppercase tracking-widest hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No projects found for this category.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Projects;
