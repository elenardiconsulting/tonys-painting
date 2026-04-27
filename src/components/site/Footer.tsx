import tonysLogo from "@/assets/tonys-logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/5">
      <div className="container py-12 md:py-16 grid md:grid-cols-3 gap-10">
        <div>
          <a href="/" className="inline-block" aria-label="Tony's Remodeling home">
            <img
              src={tonysLogo}
              alt="Tony's Remodeling - Painting and Carpentry"
              className="h-[42px] md:h-[56px] w-auto object-contain"
            />
          </a>
          <p className="mt-4 text-sm text-background/60 max-w-xs leading-relaxed">
            Premium painting and remodeling, serving Martha&apos;s Vineyard and New England since 2004.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-background/50 mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Services", href: "/services" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "About", href: "/about" },
              { label: "Reviews", href: "/reviews" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-background/80 hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-background/50 mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-background/80">
            <li>Martha&apos;s Vineyard, MA</li>
            <li>Boston, MA</li>
            <li>
              <a href="/contact" className="hover:text-primary transition-colors">
                Request an estimate
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-background/50">
          <div>© {new Date().getFullYear()} Tony&apos;s Painting and Remodeling. All rights reserved.</div>
          <div>Built with care in New England.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
