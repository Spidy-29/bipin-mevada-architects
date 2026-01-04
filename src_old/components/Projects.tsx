import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAllProjectItems, ProjectItem } from '../utils/imageUtils';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for modal
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get all project items from the utility
  const projectItems: ProjectItem[] = getAllProjectItems();

  // Function to open modal
  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsPlaying(false);
    setIsMuted(false);
    document.body.style.overflow = 'hidden';
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedProject(null);
    setIsPlaying(false);
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    document.body.style.overflow = 'auto';
  };

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="w-full py-24 relative" id="projects">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-[#8B7F73]"></span>
              <p className="text-[10px] tracking-[0.4em] uppercase font-sans font-medium" style={{ color: '#8B7F73' }}>
                WORKS
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif" style={{ color: '#1A1818' }}>
              Selected Projects
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-sm font-sans md:text-right" style={{ color: '#5A524A', lineHeight: '1.9' }}>
            A tailored selection of residential and commercial environments, each defined by clarity and rigorous detail.
          </p>
        </motion.div>

        {/* Masonry Grid  */}
        <div
          ref={ref}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {projectItems.map((project, index) => (
            <motion.div
              key={project.id}
              className={`group relative overflow-hidden cursor-pointer break-inside-avoid mb-6
                ${project.featured ? 'md:col-span-2' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => openModal(project)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`Project ${project.id}`}
                  className="w-full h-auto object-cover calm-transition group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-900/20 opacity-0 group-hover:opacity-100 calm-transition" />

                {/* Video indicator */}
                {project.video && (
                  <div className="absolute top-4 right-4 bg-stone-100/90 text-charcoal-900 px-3 py-1.5 text-xs font-sans tracking-wider">
                    <Play className="w-3 h-3 inline mr-1" />
                    VIDEO
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for fullscreen viewing */}
      {selectedProject && (
        <div className="fixed inset-0 bg-charcoal-900/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-6">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-stone-100 bg-charcoal-900/50 p-3 rounded-none 
                       hover:bg-charcoal-800 calm-transition z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video controls (only for videos) */}
            {selectedProject.video && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                <button
                  onClick={togglePlay}
                  className="bg-stone-100/90 p-3 rounded-none hover:bg-stone-200 
                           calm-transition text-charcoal-900"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-stone-100/90 p-3 rounded-none hover:bg-stone-200 
                           calm-transition text-charcoal-900"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            )}

            {/* Content container */}
            <div className="max-w-6xl max-h-full flex items-center justify-center">
              {selectedProject.video ? (
                <video
                  ref={videoRef}
                  src={selectedProject.video}
                  className="max-w-full max-h-[85vh] object-contain"
                  onEnded={handleVideoEnded}
                  muted={isMuted}
                  loop
                />
              ) : (
                <img
                  src={selectedProject.image}
                  alt={`Project ${selectedProject.id} Fullscreen`}
                  className="max-w-full max-h-[85vh] object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;