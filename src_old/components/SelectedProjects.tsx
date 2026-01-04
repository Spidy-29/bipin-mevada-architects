import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SelectedProjects: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const selectedProjects = [
        { id: 1, image: '/images/1.jpg', size: 'large' },
        { id: 2, image: '/images/3.jpg', size: 'small' },
        { id: 6, image: '/images/6.jpg', size: 'small' },
        { id: 4, image: '/images/4.jpg', size: 'small' },
    ];

    return (
        <section className="w-full py-24 relative" id="portfolio">
            <div className="max-w-7xl mx-auto px-8 md:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-1">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-8 bg-[#8B7F73]"></span>
                            <p className="text-[10px] tracking-[0.4em] uppercase font-sans font-medium" style={{ color: '#8B7F73' }}>
                                PORTFOLIO
                            </p>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif leading-[0.9]" style={{ color: '#1A1818' }}>
                            Selected Works
                        </h2>
                    </div>
                    <button className="hidden md:block text-[10px] tracking-[0.25em] uppercase border-b border-[#1A1818] pb-1 hover:opacity-60 transition-opacity" style={{ color: '#1A1818' }}>
                        VIEW ALL PROJECTS
                    </button>
                </div>

                {/* Projects Grid */}
                <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`relative overflow-hidden cursor-pointer group ${project.size === 'large' ? 'col-span-2 row-span-2' : 'col-span-1'
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="relative w-full h-full" style={{ aspectRatio: project.size === 'large' ? '1/1' : '3/4' }}>
                                <img
                                    src={project.image}
                                    alt={`Project ${project.id}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View all Section below grid */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['/images/5.jpg', '/images/7.jpg', '/images/8.jpg', '/images/9.jpg'].map((img, idx) => (
                        <motion.div
                            key={idx}
                            className="relative overflow-hidden cursor-pointer group aspect-square"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: (4 + idx) * 0.1 }}
                        >
                            <img
                                src={img}
                                alt={`View all project ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SelectedProjects;
