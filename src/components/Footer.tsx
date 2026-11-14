import Link from "next/link";
import { SOCIAL_LINKS, COMPANY_INFO } from "@/constants/contact";

export function Footer() {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border relative z-10">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 text-foreground" aria-label="BM Design Studio home">
              <img
                src="/images/logo-assets/favicons/apple-touch-icon.png"
                alt=""
                aria-hidden="true"
                className="h-20 w-20 md:h-24 md:w-24 shrink-0 object-contain"
              />
              <span className="flex flex-col justify-between font-serif font-medium text-md md:text-xl tracking-wide leading-none">
                <span>BM</span>
                <span>Design</span>
                <span>Studio</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {COMPANY_INFO.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground font-serif font-medium">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/portfolio"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                About & Contact
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground font-serif font-medium">
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
            Residential Architecture & Design
          </p>
        </div>
      </div>
    </footer>
  );
}
