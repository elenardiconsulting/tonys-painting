import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import tonysLogo from "@/assets/tonys-logo.png";

const links = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // On non-home pages: always solid. On home: transparent until 80px scroll.
  const solid = !isHome || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out border-b",
        solid
          ? "bg-dark/95 backdrop-blur supports-[backdrop-filter]:bg-dark/80 border-white/5 shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
          : "bg-transparent border-transparent shadow-none",
      )}
    >
      <nav className="container flex h-16 md:h-20 items-center justify-between">
        <a href="/" className="flex items-center" aria-label="Tony's Remodeling home">
          <img
            src={tonysLogo}
            alt="Tony's Remodeling - Painting and Carpentry"
            className="h-[52px] md:h-[62px] w-auto object-contain"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-background/80 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm">
            <a href="/contact">Get Free Estimate</a>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-background"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-dark">
          <ul className="container py-4 flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-background/80 hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm">
                <a href="/contact" onClick={() => setOpen(false)}>Get Free Estimate</a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
