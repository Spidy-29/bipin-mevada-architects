import React from "react";

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full" id="hero" style={{ paddingTop: '80px' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side - Content */}
          <div className="pt-8">
            {/* Small Label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-8 bg-[#8B7F73]"></span>
              <p className="text-[10px] tracking-[0.4em] uppercase font-sans font-medium" style={{ color: '#8B7F73' }}>
                ESTD. 2024
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[0.95]" style={{ color: '#1A1818' }}>
              Structure <br />
              <span className="italic font-light opacity-80">& Silence.</span>
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base leading-relaxed mb-10 font-sans max-w-md" style={{ color: '#5A524A', lineHeight: '1.9' }}>
              We define architecture not by what is added, but by the space that is created. A study in light, material, and the art of living.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-5">
              <button
                onClick={() => window.open('https://calendly.com', '_blank')}
                className="btn-primary tracking-[0.2em] text-[10px]"
              >
                PROPOSAL
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="btn-secondary tracking-[0.2em] text-[10px]"
              >
                PROJECTS
              </button>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative h-[550px] w-full group overflow-hidden">
            {/* Decorative frames */}
            <div className="absolute inset-0 border-[0.5px] border-[#1A1818] opacity-10 scale-[0.98] z-10 pointer-events-none"></div>

            <img
              src="/images/1.jpg"
              alt="Minimalist Architecture"
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;