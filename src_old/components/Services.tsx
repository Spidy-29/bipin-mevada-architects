import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });



    return (
        <section className="w-full py-24 relative" id="services">
            <div className="max-w-7xl mx-auto px-8 md:px-12">
                {/* Header */}
                <div className="text-center mb-20">
                    <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: '#8B7F73' }}>
                        CAPABILITIES
                    </p>
                    <h2 className="text-4xl md:text-5xl font-serif" style={{ color: '#1A1818' }}>
                        Expertise
                    </h2>
                </div>

                {/* Services Grid */}
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {[
                        {
                            title: 'The Built Form',
                            desc: 'We conceive structures that stand as timeless testaments to their environment, blending permanence with grace.'
                        },
                        {
                            title: 'Inner Sanctuary',
                            desc: 'Curating internal landscapes that nurture the human experience through tactile materials and light.'
                        },
                        {
                            title: 'Spatial Logic',
                            desc: 'Orchestrating flow and function with mathematical precision to maximize utility and comfort.'
                        },
                        {
                            title: 'Visual Realism',
                            desc: 'Translating conceptual visions into photorealistic narratives that bridge imagination and reality.'
                        }
                    ].map((service, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <span className="text-[10px] tracking-[0.2em] text-[#8B7F73] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                0{index + 1}
                            </span>
                            <h3 className="text-lg font-serif mb-4 tracking-wide" style={{ color: '#1A1818' }}>
                                {service.title}
                            </h3>
                            <p className="text-xs md:text-sm leading-relaxed max-w-xs" style={{ color: '#5A524A', lineHeight: '2' }}>
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
