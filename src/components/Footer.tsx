import { Link } from "react-router-dom";
import { SOCIAL_LINKS, COMPANY_INFO } from "@/constants/contact";

export function Footer() {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border relative z-10">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="font-serif text-xl md:text-2xl tracking-tight text-foreground uppercase">
              {COMPANY_INFO.name}
              <span className="block text-[0.6rem] md:text-[0.7rem] tracking-[0.2em] font-sans -mt-1 md:-mt-2">{COMPANY_INFO.subtitle}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {COMPANY_INFO.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground font-sans">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                to="/projects"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                Projects
              </Link>
              <Link
                to="/portfolio"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                Portfolio
              </Link>
              <Link
                to="/about"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                About & Contact
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground font-sans">
              Connect
            </h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-foreground group-hover:bg-foreground transition-all duration-300">
                    <social.icon size={16} className="text-muted-foreground group-hover:text-background transition-colors" />
                  </div>
                  {/* <div>
                    <p className="text-sm group-hover:text-muted-foreground transition-colors">
                      {social.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{social.value}</p>
                  </div> */}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            {COMPANY_INFO.copyright}
          </p>
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            Architecture & Design
          </p>
        </div>
      </div>
    </footer>
  );
}
