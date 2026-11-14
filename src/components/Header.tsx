import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjects } from "@/hooks/useContent";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About & Contact", href: "/about" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: projects, isLoading } = useProjects();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  // Filter out Projects link if no projects available
  const filteredLinks = NAV_LINKS.filter(link => {
    if (link.label === "Projects") {
      return !isLoading && projects && projects.length > 0;
    }
    return true;
  });

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border py-3 md:py-4"
          : "bg-transparent py-4 md:py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="font-serif font-medium text-base md:text-lg tracking-wide leading-tight text-foreground">
          <Link href="/" className="flex">
            <img
                  src="/images/logo-assets/favicons/apple-touch-icon.png"
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-10 md:h-16 md:w-16 shrink-0 object-contain"
                />
            <div className="flex flex-col m-auto p-auto">
              <span>BM Design</span>
              <span>Studio</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link font-medium text-sm uppercase tracking-widest transition-colors duration-300 pb-1 font-serif",
                router.pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:text-muted-foreground transition-colors z-50"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 md:hidden transition-all duration-500 flex flex-col items-center justify-center",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {filteredLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-serif text-2xl transition-all duration-300",
                router.pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header >
  );
}
