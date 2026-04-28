import { useState, useRef, useEffect } from "react";
import FadeUpSection from "@/components/site/FadeUpSection";

const projects = [
  { name: "Colonial home exterior painting", type: "Exterior", src: "/images/project-13.jpg", alt: "Colonial home exterior painting, New England" },
  { name: "Tony's team painting home", type: "Exterior", src: "/images/project-12.jpg", alt: "Tony's team painting blue exterior home" },
  { name: "Premium deck staining", type: "Exterior", src: "/images/project-07.jpg", alt: "Premium deck staining and finishing" },
  { name: "Bathroom remodel", type: "Remodeling", src: "/images/project-04.jpg", alt: "Bathroom remodel with tile and hardwood" },
  { name: "Deck staining", type: "Exterior", src: "/images/project-09.jpg", alt: "Deck staining New England" },
  { name: "Kitchen remodel", type: "Remodeling", src: "/images/project-16.jpg", alt: "Kitchen remodel with countertop installation" },
];

const PortfolioPreview = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeUpSection
              key={p.name}
              delay={(i % 3) * 0.1}
              as="article"
              className="portfolio-item group relative aspect-[4/5] bg-background overflow-hidden"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="portfolio-overlay absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="portfolio-caption">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">{p.type}</p>
                  <h3 className="font-display text-2xl md:text-3xl text-background">{p.name}</h3>
                </div>
              </div>
            </FadeUpSection>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden -mx-6">
          <div
            ref={scrollRef}
            className="portfolio-slider"
          >
            {projects.map((p) => (
              <div
                key={p.name}
                className="portfolio-slide"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
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
        @media (max-width: 767px) {
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