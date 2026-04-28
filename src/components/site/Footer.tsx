import tonysLogo from "@/assets/tonys-logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/5">
      <div
        className="container py-12 md:py-16 footer-grid"
        style={{
          display: "grid",
          gap: 40,
          alignItems: "start",
        }}
      >
        <div>
          <a href="/" className="inline-block" aria-label="Tony's Remodeling home">
            <img
              src={tonysLogo}
              alt="Tony's Remodeling - Painting and Carpentry"
              className="h-[42px] md:h-[56px] w-auto object-contain"
            />
          </a>
          <p className="mt-4 text-sm text-background/60 max-w-xs leading-relaxed">
            Premium painting and remodeling, serving New England since 2004.
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
            <li>11 Cook Rd, Vineyard Haven, MA 02568</li>
            <li>
              <a href="/contact" className="hover:text-primary transition-colors">
                Request an estimate
              </a>
            </li>
          </ul>
        </div>

        {/* Map column */}
        <div className="footer-map-col">
          <div className="text-xs uppercase tracking-[0.2em] text-background/50 mb-4">
            Our Area
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <iframe
              title="Tony's Painting service area map"
              src="https://www.google.com/maps?q=11+Cook+Rd,+Vineyard+Haven,+MA+02568&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
                display: "block",
                filter: "grayscale(100%) invert(92%) contrast(85%)",
              }}
              loading="lazy"
              allowFullScreen={false}
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div
              style={{
                position: "absolute",
                bottom: "8px",
                left: "8px",
                right: "8px",
                background: "rgba(26,26,26,0.85)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "6px",
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#C4291C",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  color: "#F5F1EB",
                  fontWeight: 500,
                }}
              >
                Martha's Vineyard, MA
              </span>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=11+Cook+Rd,+Vineyard+Haven,+MA+02568"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "10px",
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              color: "#C4291C",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Get directions →
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-background/50">
          <div>© {new Date().getFullYear()} Tony&apos;s Painting and Remodeling. All rights reserved.</div>
          <div>Built with care in New England.</div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr 400px;
          }
          .footer-grid > div:nth-child(2),
          .footer-grid > div:nth-child(3) {
            justify-self: end;
          }
        }
        @media (max-width: 767px) {
          .footer-map-col { display: none; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
