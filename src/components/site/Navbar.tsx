import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-dark/95 backdrop-blur supports-[backdrop-filter]:bg-dark/80 border-b border-white/5">
      <nav className="container flex h-16 md:h-20 items-center justify-between">
        <a href="#top" className="font-display text-xl md:text-2xl font-semibold tracking-tight text-background">
          Tony&apos;s Painting
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
            <a href="#contact">Get Free Estimate</a>
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
                <a href="#contact" onClick={() => setOpen(false)}>Get Free Estimate</a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
