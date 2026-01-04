import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation items with corresponding section IDs
  const navItems = [
    { name: "PROJECTS", id: "portfolio" },
    { name: "EXPERTISE", id: "services" },
    { name: "STUDIO", id: "about" }
  ];

  // Function to handle smooth scrolling to sections
  const scrollToSection = (id: string) => {
    // Close mobile menu if open
    if (isOpen) setIsOpen(false);

    // Find the element
    const element = document.getElementById(id);
    if (element) {
      // Scroll smoothly to the element
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(250, 248, 245, 0.8)', borderColor: 'rgba(232, 225, 217, 0.5)' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="font-serif text-2xl tracking-[0.05em] text-[#1A1818]">
              ATELIER 27
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-charcoal-700 hover:text-charcoal-900 text-sm tracking-wider 
                         transition-all duration-500 relative group font-sans font-medium"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-charcoal-900 
                               group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal-900 p-2 rounded-none hover:bg-stone-100 
                       transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 transform ${isOpen
          ? "max-h-64 opacity-100"
          : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-stone-50 border-t border-stone-200/50">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="text-charcoal-700 hover:text-charcoal-900 hover:bg-stone-100
                       block w-full px-4 py-3 text-left text-sm tracking-wider
                       transition-all duration-300 font-sans font-medium"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;