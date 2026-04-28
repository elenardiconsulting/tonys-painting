import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import tonysLogo from "@/assets/tonys-logo.png";

const services = [
  { label: "Interior Painting", href: "/services/interior-painting" },
  { label: "Exterior Painting", href: "/services/exterior-painting" },
  { label: "Remodeling", href: "/services/remodeling" },
  { label: "Handyman Services", href: "/services/handyman" },
  { label: "Deck and Stairs", href: "/services/deck-stairs" },
  { label: "Construction Cleaning", href: "/services/construction-cleaning" },
  { label: "General Carpentry", href: "/services/carpentry" },
  { label: "Flooring", href: "/services/flooring" },
  { label: "Ceramic Tile", href: "/services/ceramic-tile" },
  { label: "Fence", href: "/services/fence" },
  { label: "Plastering", href: "/services/plastering" },
  { label: "Countertop", href: "/services/countertop" },
];

const links = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = !isHome || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out border-b",
        solid
          ? "bg-[#2A2A28] border-white/5 shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
          : "bg-transparent border-transparent shadow-none",
      )}
    >
      <nav className="container flex h-16 md:h-20 items-center justify-between">
        <div className="flex-1 flex justify-start">
          <a href="/" className="flex items-center" aria-label="Tony's Remodeling home">
            <img
              src={tonysLogo}
              alt="Tony's Remodeling - Painting and Carpentry"
              className="h-[42px] md:h-[56px] w-auto object-contain"
            />
          </a>
        </div>

        <ul className="hidden md:flex flex-1 items-center justify-center gap-8">
          {/* Services dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <a
              href="/services"
              className="flex items-center gap-1 text-sm font-medium text-white hover:opacity-70 transition-all duration-200 py-2"
            >
              Services
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-200", servicesOpen && "rotate-180")}
              />
            </a>
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200",
                servicesOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1 pointer-events-none",
              )}
            >
              <div className="bg-[#2A2A28] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] rounded-sm grid grid-cols-2 gap-x-2 py-3 min-w-[460px]">
                {services.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="block px-5 py-2 text-sm text-white/80 hover:text-primary hover:bg-white/5 transition-colors whitespace-nowrap"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </li>

          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-white hover:opacity-70 transition-all duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex flex-1 justify-end">
          <Button asChild className="group bg-primary text-white hover:bg-primary-dark rounded-lg px-5 py-2.5 h-auto transition-all duration-200">
            <a href="/contact" className="flex items-center gap-2">
              Request a Consultation
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-white relative z-[60]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[55] bg-[#2A2A28] transition-transform duration-500 ease-in-out md:hidden",
          open ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full px-8 gap-8">
          <ul className="flex flex-col items-center gap-6">
            <li>
              <a 
                href="/services" 
                onClick={() => setOpen(false)}
                className="font-['Playfair_Display'] font-bold text-2xl text-white hover:text-primary transition-colors"
              >
                Services
              </a>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-['Playfair_Display'] font-bold text-2xl text-white hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="w-full max-w-[280px] pt-4">
            <Button asChild className="w-full bg-primary text-white hover:bg-primary-dark rounded-lg py-6 h-auto transition-all duration-200">
              <a href="/contact" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 text-lg font-bold">
                Request a Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;