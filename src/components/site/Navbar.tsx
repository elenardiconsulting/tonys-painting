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

  const solid = !isHome || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out border-b",
        solid
          ? "bg-[#1A1A1A] border-white/5 shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
          : "bg-transparent border-transparent shadow-none",
      )}
    >
      <nav className="container flex h-16 md:h-20 items-center justify-between">
        <div className="flex-1 flex justify-start">
          <a href="/" className="flex items-center" aria-label="Tony's Remodeling home">
            <img
              src={tonysLogo}
              alt="Tony's Remodeling - Painting and Carpentry"
              className="h-[52px] md:h-[62px] w-auto object-contain"
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
              <div className="bg-[#1A1A1A] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] rounded-sm grid grid-cols-2 gap-x-2 py-3 min-w-[460px]">
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
              Get Free Estimate
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#1A1A1A] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <ul className="container py-4 flex flex-col gap-2">
            <li>
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="w-full flex items-center justify-between py-2 text-white/80 hover:text-primary"
              >
                <span>Services</span>
                <ChevronDown
                  size={16}
                  className={cn("transition-transform", mobileServicesOpen && "rotate-180")}
                />
              </button>
              {mobileServicesOpen && (
                <ul className="pl-4 mt-1 mb-2 flex flex-col gap-1 border-l border-white/10">
                  <li>
                    <a
                      href="/services"
                       onClick={() => setOpen(false)}
                      className="block px-3 py-1.5 text-sm text-white/60 hover:text-primary"
                    >
                      All Services
                    </a>
                  </li>
                  {services.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                         onClick={() => setOpen(false)}
                        className="block px-3 py-1.5 text-sm text-white/80 hover:text-primary"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                   onClick={() => setOpen(false)}
                  className="block py-2 text-white/80 hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="group w-full bg-primary text-white hover:bg-primary-dark rounded-lg py-3 transition-all duration-200">
                <a href="/contact" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2">
                  Get Free Estimate
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;