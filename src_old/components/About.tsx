import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="w-full py-24 relative" id="about" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* About Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-8 bg-[#8B7F73]"></span>
              <p className="text-[10px] tracking-[0.4em] uppercase font-sans font-medium" style={{ color: '#8B7F73' }}>
                THE STUDIO
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif leading-[1.1]" style={{ color: '#1A1818' }}>
              Architecture as a <br />
              <span className="italic opacity-80">dialogue with nature.</span>
            </h2>
          </div>

          <div className="space-y-8 pt-4">
            <p className="text-sm leading-relaxed font-sans" style={{ color: '#5A524A', lineHeight: '2' }}>
              We are a multidisciplinary design practice rooted in the belief that spaces should be felt before they are seen. Our work oscillates between the technical rigors of construction and the poetic nuances of habitation.
            </p>
            <p className="text-sm leading-relaxed font-sans" style={{ color: '#5A524A', lineHeight: '2' }}>
              From the first sketch to the final stone, we pursue a singular vision: to create environments that are not just occupied, but experienced.
            </p>

            <img
              src="/images/2.jpg"
              alt="Studio Atmosphere"
              className="w-full h-64 object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="border-t border-[#E8E1D9] pt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Contact Info */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-8 font-sans font-medium" style={{ color: '#8B7F73' }}>
                INQUIRIES
              </p>
              <h3 className="text-3xl md:text-4xl font-serif mb-12" style={{ color: '#1A1818' }}>
                Start a conversation
              </h3>

              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h4 className="text-xs uppercase tracking-widest mb-4 font-sans text-[#1A1818]">Contact</h4>
                  <a href="mailto:hello@atelier27.com" className="block text-sm text-[#5A524A] hover:text-[#1A1818] transition-colors mb-2">bipin.mevada@yahoo.com</a>
                  <a href="tel:+919825346592" className="block text-sm text-[#5A524A] hover:text-[#1A1818] transition-colors">+91 98253-46592</a>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest mb-4 font-sans text-[#1A1818]">Studio</h4>
                  <p className="text-sm text-[#5A524A] leading-relaxed">
                    104, Solitaire,<br />
                    Near Bombay garage,<br />
                    Shahibaug, Ahmedabad
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div>
              <form className="space-y-8">
                <div className="group">
                  <input
                    type="text"
                    placeholder="NAME"
                    className="w-full py-4 bg-transparent border-b border-[#E8E1D9] text-[#1A1818] placeholder-[#8B7F73] focus:outline-none focus:border-[#1A1818] transition-colors text-xs tracking-widest uppercase"
                  />
                </div>
                <div className="group">
                  <input
                    type="email"
                    placeholder="EMAIL"
                    className="w-full py-4 bg-transparent border-b border-[#E8E1D9] text-[#1A1818] placeholder-[#8B7F73] focus:outline-none focus:border-[#1A1818] transition-colors text-xs tracking-widest uppercase"
                  />
                </div>
                <div className="group">
                  <textarea
                    placeholder="PROJECT DETAILS"
                    rows={1}
                    className="w-full py-4 bg-transparent border-b border-[#E8E1D9] text-[#1A1818] placeholder-[#8B7F73] focus:outline-none focus:border-[#1A1818] transition-colors resize-none text-xs tracking-widest uppercase"
                    style={{ minHeight: '3rem' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary mt-8 px-8 py-3 bg-[#1A1818] text-white text-[10px] tracking-[0.2em] uppercase hover:bg-[#5A524A] transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;