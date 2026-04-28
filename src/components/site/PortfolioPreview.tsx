import { useState, useRef, useEffect } from "react";
import FadeUpSection from "@/components/site/FadeUpSection";

const projects = [
  { name: "Luxury Kitchen Interior", type: "Interior", src: "/images/interior-04.jpg", alt: "Luxury white kitchen interior painting and remodeling, New England" },
  { name: "Open Plan Living Space", type: "Interior", src: "/images/interior-03.jpg", alt: "Open plan kitchen and living room interior, Martha's Vineyard" },
  { name: "Hardwood Floor Refinishing", type: "Remodeling", src: "/images/flooring-01.jpg", alt: "Hardwood floor refinishing and restoration, New England" },
  { name: "Kitchen Remodel", type: "Remodeling", src: "/images/remodeling-02.jpg", alt: "Full kitchen remodel with subway tile and custom cabinets" },
  { name: "Kitchen Detail", type: "Interior", src: "/images/interior-01.jpg", alt: "White kitchen cabinets and island interior painting" },
  { name: "Floor Restoration", type: "Remodeling", src: "/images/flooring-03.jpg", alt: "Dark hardwood floor restoration, Boston area" },
];

const PortfolioPreview = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveSlide(index);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const handleScroll = () => {
      const pageWidth = el.offsetWidth;
      const page = Math.round(el.scrollLeft / pageWidth);
      setActivePage(page);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPage = (slice: typeof projects) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        flexShrink: 0,
        width: "100%",
        scrollSnapAlign: "start",
      }}
    >
      {slice.map((p, i) => (
        <div
          key={p.name}
          style={{
            aspectRatio: "4/5",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img
            src={p.src}
            alt={p.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section id="portfolio" className="bg-stone overflow-hidden" style={{ contain: "layout" }}>
      <div className="container py-20 md:py-28">
        <FadeUpSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Selected Work</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              A portfolio shaped by care.
            </h2>
          </div>
          <a
            href="/portfolio"
            className="text-sm font-medium text-foreground border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors pb-0.5 self-start md:self-auto"
          >
            View full portfolio
          </a>
        </FadeUpSection>

        {/* Desktop Layout: 1 row de 3 colunas que desliza para mostrar fotos adicionais */}
        <div className="portfolio-desktop-layout">
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div
              ref={sliderRef}
              style={{
                display: "flex",
                overflowX: "scroll",
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
                gap: "16px",
              }}
            >
              {renderPage(projects.slice(0, 3))}
              {renderPage(projects.slice(3, 6))}
            </div>

            {activePage === 0 && (
              <button
                aria-label="Next portfolio page"
                onClick={() =>
                  sliderRef.current?.scrollTo({
                    left: sliderRef.current.offsetWidth,
                    behavior: "smooth",
                  })
                }
                style={{
                  position: "absolute",
                  right: "-16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#1A1A1A",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  zIndex: 2,
                }}
              >
                →
              </button>
            )}

            {activePage === 1 && (
              <button
                aria-label="Previous portfolio page"
                onClick={() =>
                  sliderRef.current?.scrollTo({ left: 0, behavior: "smooth" })
                }
                style={{
                  position: "absolute",
                  left: "-16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#1A1A1A",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  zIndex: 2,
                }}
              >
                ←
              </button>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
            {[0, 1].map((i) => (
              <button
                key={i}
                aria-label={`Go to portfolio page ${i + 1}`}
                onClick={() =>
                  sliderRef.current?.scrollTo({
                    left: i === 0 ? 0 : sliderRef.current.offsetWidth,
                    behavior: "smooth",
                  })
                }
                style={{
                  width: activePage === i ? "24px" : "8px",
                  height: "8px",
                  borderRadius: activePage === i ? "4px" : "50%",
                  background: activePage === i ? "#C4291C" : "rgba(0,0,0,0.18)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout — sem alteracao */}
        <div className="portfolio-mobile-layout md:hidden -mx-6">
          <div
            ref={scrollRef}
            className="portfolio-slider"
          >
            {projects.map((p, i) => (
              <div
                key={p.name}
                className="portfolio-slide"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  // @ts-expect-error fetchpriority is valid HTML
                  fetchpriority={i < 2 ? "high" : undefined}
                  decoding="async"
                  style={{ objectPosition: "center" }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                  <h3 className="font-sans font-semibold text-white text-[14px]">
                    {p.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 ${
                  activeSlide === i
                    ? "bg-[#C4291C] w-[20px] h-[6px] rounded-[3px]"
                    : "bg-black/20 w-[6px] h-[6px] rounded-full"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .portfolio-desktop-layout {
          display: block;
        }
        .portfolio-mobile-layout {
          display: none;
        }

        .portfolio-desktop-slider {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          gap: 24px;
        }
        .portfolio-desktop-slider::-webkit-scrollbar {
          display: none;
        }
        .portfolio-desktop-slide {
          flex-shrink: 0;
          width: calc((100% - 48px) / 3);
          scroll-snap-align: start;
        }

        @media (max-width: 767px) {
          .portfolio-desktop-layout {
            display: none !important;
          }
          .portfolio-mobile-layout {
            display: block !important;
          }

          .portfolio-slider {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 0 24px;
            gap: 16px;
          }
          
          .portfolio-slider::-webkit-scrollbar {
            display: none;
          }

          .portfolio-slide {
            width: calc(100vw - 64px);
            flex-shrink: 0;
            scroll-snap-align: center;
            border-radius: 12px;
            overflow: hidden;
            height: 260px;
            position: relative;
          }
        }
      `}</style>
    </section>
  );
};

export default PortfolioPreview;