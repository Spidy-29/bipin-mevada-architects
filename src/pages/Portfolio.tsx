import { useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/GridBackground";
// Assets from public folder
// Images: 1.jpg to 12.jpg, 15.webp, 16.webp, 17.png

type FilterType = "all" | "architecture" | "interior" | "video";

const portfolioItems = [
  { id: "1", image: "/images/1.jpg", title: "Modern Residence", category: "architecture", type: "project", year: "2024" },
  { id: "2", image: "/images/2.jpg", title: "Urban Living", category: "interior", type: "project", year: "2024" },
  { id: "3", image: "/images/3.jpg", title: "Minimalist Apartment", category: "interior", type: "project", year: "2024" },
  { id: "4", image: "/images/4.jpg", title: "Garden House", category: "architecture", type: "project", year: "2023" },
  { id: "5", image: "/images/5.jpg", title: "Luxury Bath", category: "interior", type: "project", year: "2023" },
  { id: "6", image: "/images/6.jpg", title: "Corporate Space", category: "interior", type: "project", year: "2023" },
  { id: "7", image: "/images/7.jpg", title: "Weekend Villa", category: "architecture", type: "project", year: "2022" },
  { id: "8", image: "/images/8.jpg", title: "Contemporary Kitchen", category: "interior", type: "project", year: "2022" },
  { id: "9", image: "/images/9.jpg", title: "Studio Apartment", category: "interior", type: "project", year: "2022" },
  { id: "10", image: "/images/10.jpg", title: "Commercial Complex", category: "architecture", type: "project", year: "2021" },
  { id: "11", image: "/images/11.jpg", title: "Private Suite", category: "interior", type: "project", year: "2021" },
  { id: "12", image: "/images/12.jpg", title: "Lakeside Home", category: "architecture", type: "project", year: "2021" },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Architecture", value: "architecture" },
  { label: "Interior", value: "interior" },
  { label: "Videos", value: "video" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "video") return item.type === "video";
    return item.category === activeFilter;
  });

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
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "text-xs md:text-sm uppercase tracking-widest pb-1 transition-all duration-300",
                  activeFilter === filter.value
                    ? "text-foreground border-b border-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid - Masonry Style */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {filteredItems.map((item, index) => (
              <Link
                key={item.id}
                to={`/project/${item.id}`}
                className="group block break-inside-avoid opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
              >
                <div className="relative overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={cn(
                      "w-full object-cover transition-transform duration-700 group-hover:scale-105",
                      index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                    )}
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play size={24} className="text-foreground ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs uppercase tracking-widest text-background/70">
                      {item.category} • {item.year}
                    </span>
                    <h3 className="font-serif text-lg text-background">{item.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
