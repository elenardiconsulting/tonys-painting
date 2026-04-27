import { Brush, Home, Hammer } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import FadeUpSection from "@/components/site/FadeUpSection";

const services = [
  {
    icon: Brush,
    name: "Interior Painting",
    desc: "Refined finishes that bring warmth and character to every room.",
  },
  {
    icon: Home,
    name: "Exterior Painting",
    desc: "Durable, weather ready coatings built for New England conditions.",
  },
  {
    icon: Hammer,
    name: "Remodeling",
    desc: "Thoughtful renovations from carpentry to full room transformations.",
  },
];

const ServicesPreview = () => {
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
    <section id="services" className="bg-background">
      <div className="container py-20 md:py-28">
        <FadeUpSection className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">What We Do</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
            Craftsmanship for homes that deserve more.
          </h2>
        </FadeUpSection>

        {/* Desktop Grid */}
        <div className="craftsmanship-grid mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {services.map(({ icon: Icon, name, desc }, i) => (
            <FadeUpSection key={name} delay={i * 0.1} as="article" className="service-card bg-background p-8 md:p-10 hover:bg-stone">
              <Icon className="text-primary" size={32} strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-2xl md:text-3xl text-foreground">{name}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
              <a
                href="/services"
                className="mt-6 inline-block text-sm font-medium text-foreground border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors pb-0.5"
              >
                Learn more
              </a>
            </FadeUpSection>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden mt-12 -mx-6">
          <div ref={scrollRef} className="craftsmanship-slider">
            {services.map(({ icon: Icon, name, desc }) => (
              <article key={name} className="craftsmanship-slide">
                <Icon className="text-primary" size={32} strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-2xl text-foreground">{name}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-[15px]">{desc}</p>
                <a
                  href="/services"
                  className="mt-6 inline-block text-sm font-medium text-foreground border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors pb-0.5"
                >
                  Learn more
                </a>
              </article>
            ))}
          </div>

          <div className="craftsmanship-dots">
            {services.map((_, i) => (
              <div key={i} className={`craftsmanship-dot ${activeSlide === i ? "active" : ""}`} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .craftsmanship-grid {
            display: none;
          }
          .craftsmanship-slider {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            gap: 16px;
            padding: 0 24px;
          }
          .craftsmanship-slider::-webkit-scrollbar {
            display: none;
          }
          .craftsmanship-slide {
            flex-shrink: 0;
            width: calc(100vw - 64px);
            scroll-snap-align: center;
            border-radius: 12px;
            overflow: hidden;
            background: #FFFFFF;
            border: 0.5px solid #E8E2D8;
            padding: 24px;
          }
          .craftsmanship-dots {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 16px;
          }
          .craftsmanship-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(0,0,0,0.15);
            transition: all 0.3s ease;
          }
          .craftsmanship-dot.active {
            width: 20px;
            height: 6px;
            border-radius: 3px;
            background: #C4291C;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesPreview;
