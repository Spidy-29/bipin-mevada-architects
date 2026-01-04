import React from "react";
import { Instagram, Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
  const whatsappLink = "https://wa.me/9825346592";
  const instagramLink = "https://www.instagram.com/bipin_mevada_architects?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
  const facebookLink = "https://www.facebook.com"; // Update with actual Facebook profile

  return (
    <footer className="w-full border-t" style={{ backgroundColor: '#FAF8F5', borderColor: '#E8E1D9' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left - Brand */}
          <div>
            <h2 className="font-serif text-2xl tracking-wide" style={{ color: '#2C2520' }}>
              ATELIER 27
            </h2>
          </div>

          {/* Center - Copyright */}
          <div>
            <p className="text-xs font-sans" style={{ color: '#8B7F73' }}>
              © {new Date().getFullYear()} Atelier 27. All rights reserved.
            </p>
          </div>

          {/* Right - Social Media Icons */}
          <div className="flex gap-4">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-300 hover:opacity-70"
              aria-label="Follow us on Instagram"
              style={{ color: '#6B6156' }}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-300 hover:opacity-70"
              aria-label="Follow us on Facebook"
              style={{ color: '#6B6156' }}
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-300 hover:opacity-70"
              aria-label="Contact us on WhatsApp"
              style={{ color: '#6B6156' }}
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
