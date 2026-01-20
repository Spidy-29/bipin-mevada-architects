import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/GridBackground";
import { useProjects, useProjectAssets } from "@/hooks/useContent";
import ImageViewer from "@/components/ImageViewer";
import { AssetDisplay } from "@/components/AssetDisplay";
import { Asset } from "@/types/cms";
import { logAnalyticsEvent } from "@/lib/firebase";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: projects, isLoading: isLoadingProject } = useProjects();
  const { data: projectAssets, isLoading: isLoadingAssets } = useProjectAssets(id || "");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const project = projects?.find((p) => p.project_id === id);

  // Get only visible/public projects for navigation
  const visibleProjects = projects
    ?.filter(p => p.visibility === 'public')
    .sort((a, b) => a.project_id.localeCompare(b.project_id)) || [];
  const projectIds = visibleProjects.map(p => p.project_id);
  const currentIndex = id ? projectIds.indexOf(id) : -1;

  // Get prev/next projects and verify they exist in the API response
  const prevProjectId = currentIndex > 0 ? projectIds[currentIndex - 1] : null;
  const nextProjectId = currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null;

  const prevProject = prevProjectId ? visibleProjects.find(p => p.project_id === prevProjectId) : null;
  const nextProject = nextProjectId ? visibleProjects.find(p => p.project_id === nextProjectId) : null;

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoadingProject || isLoadingAssets) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background relative flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center pt-24">
          <h1 className="text-2xl font-serif mb-4">Project Not Found</h1>
          <Button asChild><Link to="/portfolio">Back to Portfolio</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter assets to separate main hero image (if we want specific one) vs gallery
  // For now, take the first asset as hero if it is an image, or just use the first available image
  const images = projectAssets?.filter(a => a.asset_type === 'image') || [];
  const heroImage = images.length > 0 ? images[0] : null;
  const galleryImages = images.slice(1);

  return (
    <div className="min-h-screen bg-background relative">
      <GridBackground />
      <Header />

      <main className="pt-24 md:pt-32 relative z-10">
        {/* Hero Image */}
        {heroImage && (
          <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden cursor-pointer" onClick={() => {
            setSelectedAsset(heroImage);
            logAnalyticsEvent('select_content', { content_type: 'hero_image', content_id: heroImage.asset_id });
          }}>
            <img
              src={heroImage.asset_url}
              alt={project.project_title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          </div>
        )}


        {/* Project Info */}
        <div className="container -mt-20 md:-mt-32 relative z-10">
          <div className="bg-background/95 backdrop-blur-sm p-6 md:p-12 max-w-4xl">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {project.property_type || 'Project'} • {project.year}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-light mt-3 mb-6">
              {project.project_title}
            </h1>
            <div className="w-12 h-px bg-line mb-6" />
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl">
              {project.project_description}
            </p>
          </div>
        </div>

        {/* Project Details */}
        <section className="section-container">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {/* Construct details dynamically */}
              {[
                { label: "Location", value: project.location },
                { label: "Type", value: project.property_type },
                { label: "Space", value: project.space_type },
                { label: "Year", value: project.year?.toString() }
              ].filter(d => d.value).map(detail => (
                <div key={detail.label} className="border-l border-line pl-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {detail.label}
                  </p>
                  <p className="font-serif text-lg capitalize">{detail.value}</p>
                </div>
              ))}
            </div>

            {/* Gallery */}
            {/* Gallery */}
            <div className="columns-1 md:columns-2 gap-4 md:gap-6 space-y-4 md:space-y-6">
              {galleryImages.map((image, index) => (
                <div key={image.asset_id} className="break-inside-avoid mb-4 md:mb-6">
                  <AssetDisplay
                    asset={image}
                    alt={`${project.project_title} - ${index + 2}`}
                    aspectRatio={index % 3 === 0 ? '3/4' : index % 3 === 1 ? 'square' : '4/3'}
                    onClick={() => {
                      setSelectedAsset(image);
                      logAnalyticsEvent('select_content', { content_type: 'image', content_id: image.asset_id });
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Videos Section */}
            {projectAssets?.filter(a => a.asset_type === 'video').length > 0 && (
              <div className="mt-12 space-y-6">
                <h3 className="font-serif text-2xl">Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {projectAssets.filter(a => a.asset_type === 'video').map((video) => (
                    <AssetDisplay
                      key={video.asset_id}
                      asset={video}
                      alt={video.title || 'Project video'}
                      aspectRatio="video"
                      onClick={() => {
                        setSelectedAsset(video);
                        logAnalyticsEvent('select_content', { content_type: 'video', content_id: video.asset_id });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* PDFs Section */}
            {projectAssets?.filter(a => a.asset_type === 'pdf').length > 0 && (
              <div className="mt-12 space-y-6">
                <h3 className="font-serif text-2xl">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {projectAssets.filter(a => a.asset_type === 'pdf').map((pdf) => (
                    <AssetDisplay
                      key={pdf.asset_id}
                      asset={pdf}
                      alt={pdf.title || 'Project document'}
                      aspectRatio="4/3"
                      onClick={() => {
                        setSelectedAsset(pdf);
                        logAnalyticsEvent('select_content', { content_type: 'pdf', content_id: pdf.asset_id });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="border-t border-border">
          <div className="container py-8 md:py-12">
            <div className="flex justify-between items-center">
              {prevProject ? (
                <Link
                  to={`/project/${prevProject.project_id}`}
                  className="group flex flex-col gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-widest">Previous</span>
                  </div>
                  <span className="text-xs font-serif ml-7 opacity-0 group-hover:opacity-100 transition-opacity">
                    {prevProject.project_title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              <Button variant="minimal" asChild>
                <Link to="/projects" onClick={() => window.scrollTo(0, 0)}>All Projects</Link>
              </Button>

              {nextProject ? (
                <Link
                  to={`/project/${nextProject.project_id}`}
                  className="group flex flex-col gap-1 text-muted-foreground hover:text-foreground transition-colors text-right"
                >
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm uppercase tracking-widest">Next</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-xs font-serif mr-7 opacity-0 group-hover:opacity-100 transition-opacity">
                    {nextProject.project_title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
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

export default ProjectDetail;
