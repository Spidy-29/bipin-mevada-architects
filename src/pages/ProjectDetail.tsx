import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/GridBackground";
// Assets from public folder
// Images: 1.jpg to 12.jpg

const projectsData: Record<string, {
  title: string;
  category: string;
  year: string;
  description: string;
  images: string[];
  details: { label: string; value: string }[];
}> = {
  "1": {
    title: "Modern Residence",
    category: "Architecture",
    year: "2024",
    description: "A contemporary residential masterpiece that emphasizes natural light and open spaces.",
    images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
    details: [
      { label: "Location", value: "Ahmedabad, India" },
      { label: "Area", value: "4,500 sq ft" },
      { label: "Type", value: "Residential" },
      { label: "Status", value: "Completed" },
    ],
  },
  "2": {
    title: "Urban Living",
    category: "Interior",
    year: "2024",
    description: "Modern interior design focused on functionality and aesthetic elegance.",
    images: ["/images/2.jpg", "/images/4.jpg", "/images/5.jpg"],
    details: [
      { label: "Location", value: "Mumbai, India" },
      { label: "Area", value: "2,000 sq ft" },
      { label: "Type", value: "Apartment" },
      { label: "Status", value: "Completed" },
    ],
  },
  // Default fallback for others for now to save space, assuming pattern
};

// Simple generator for other IDs to ensure they work
for (let i = 3; i <= 12; i++) {
  projectsData[i.toString()] = {
    title: `Project ${i}`,
    category: i % 2 === 0 ? "Interior" : "Architecture",
    year: "202" + (4 - Math.floor(i / 4)),
    description: "A thoughtfully designed space that balances form and function, creating an environment that inspires and endures.",
    images: [`/images/${i}.jpg`, `/images/${(i % 12) + 1}.jpg`],
    details: [
      { label: "Location", value: "India" },
      { label: "Area", value: "Variable" },
      { label: "Type", value: "Design" },
      { label: "Status", value: "Completed" },
    ],
  };
}

const defaultProject = {
  title: "Project",
  category: "Architecture",
  year: "2023",
  description: "A thoughtfully designed space that balances form and function, creating an environment that inspires and endures.",
  images: ["/images/1.jpg", "/images/2.jpg"],
  details: [
    { label: "Location", value: "Global" },
    { label: "Area", value: "Variable" },
    { label: "Type", value: "Mixed" },
    { label: "Status", value: "Completed" },
  ],
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id && projectsData[id] ? projectsData[id] : defaultProject;

  const projectIds = Object.keys(projectsData);
  const currentIndex = id ? projectIds.indexOf(id) : -1;
  const prevProject = currentIndex > 0 ? projectIds[currentIndex - 1] : null;
  const nextProject = currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background relative">
      <GridBackground />
      <Header />

      <main className="pt-24 md:pt-32 relative z-10">
        {/* Hero Image */}
        <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        {/* Project Info */}
        <div className="container -mt-20 md:-mt-32 relative z-10">
          <div className="bg-background/95 backdrop-blur-sm p-6 md:p-12 max-w-4xl">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {project.category} • {project.year}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-light mt-3 mb-6">
              {project.title}
            </h1>
            <div className="w-12 h-px bg-line mb-6" />
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>

        {/* Project Details */}
        <section className="section-container">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {project.details.map((detail) => (
                <div key={detail.label} className="border-l border-line pl-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {detail.label}
                  </p>
                  <p className="font-serif text-lg">{detail.value}</p>
                </div>
              ))}
            </div>

            {/* Gallery */}
            <div className="space-y-6">
              {project.images.slice(1).map((image, index) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={image}
                    alt={`${project.title} - ${index + 2}`}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="border-t border-border">
          <div className="container py-8 md:py-12">
            <div className="flex justify-between items-center">
              {prevProject ? (
                <Link
                  to={`/project/${prevProject}`}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm uppercase tracking-widest">Previous</span>
                </Link>
              ) : (
                <div />
              )}

              <Button variant="minimal" asChild>
                <Link to="/portfolio">All Projects</Link>
              </Button>

              {nextProject ? (
                <Link
                  to={`/project/${nextProject}`}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-sm uppercase tracking-widest">Next</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
