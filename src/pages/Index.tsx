import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/GridBackground";
// Assets are loaded from public folder
const heroImage = "/images/1.jpg";
const projectKitchen = "/images/2.jpg";
const projectBedroom = "/images/3.jpg";
const projectExterior = "/images/4.jpg";
const projectBathroom = "/images/5.jpg";
const projectLiving = "/images/6.jpg";

const featuredProjects = [
  { id: "1", image: "/images/1.jpg", title: "Private Residence", category: "Architecture" },
  { id: "3", image: "/images/3.jpg", title: "Modern Apartment", category: "Interior" },
  { id: "4", image: "/images/4.jpg", title: "Luxury Villa", category: "Architecture" },
  { id: "6", image: "/images/6.jpg", title: "Corporate Office", category: "Interior" },
];

const galleryItems = [
  { id: 1, image: "/images/7.jpg", type: "image" },
  { id: 2, image: "/images/8.jpg", type: "image" },
  { id: 3, image: "/images/9.jpg", type: "image" },
  { id: 4, image: "/images/10.jpg", type: "image" },
];

const Index = () => {
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
                to="/portfolio"
                className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                View All
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className="group relative overflow-hidden aspect-[4/3] opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs uppercase tracking-widest text-background/80">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl text-background">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="section-container bg-card/30 backdrop-blur-[2px]">
          <div className="container">
            <div className="text-center mb-10 md:mb-14">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3">
                Gallery
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-light">Visual Stories</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {galleryItems.map((item, index) => (
                <Link
                  key={item.id}
                  to="/portfolio"
                  className="group relative aspect-square overflow-hidden opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <img
                    src={item.image}
                    alt="Gallery item"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play size={20} className="text-foreground ml-1" />
                      </div>
                    </div>
                  )}
                </Link>
              ))}
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
