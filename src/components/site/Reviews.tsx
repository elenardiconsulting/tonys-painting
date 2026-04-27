import { Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import FadeUpSection from "@/components/site/FadeUpSection";

const reviews = [
  {
    quote:
      "Tony and his crew repainted our entire home in New England. The attention to detail was extraordinary. We could not be happier.",
    name: "Margaret H.",
    location: "New England",
  },
  {
    quote:
      "From the first estimate to the final walkthrough, the team was professional, punctual, and meticulous. Highest recommendation.",
    name: "David L.",
    location: "New England",
  },
  {
    quote:
      "We have used Tony's Painting for three projects now. Quality and consistency every time. They treat your home like their own.",
    name: "Sarah & James K.",
    location: "New England",
  },
];

const Reviews = () => {
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
    <section id="reviews" className="bg-background">
      <div className="container py-20 md:py-28">
        <FadeUpSection className="max-w-2xl mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Client Reviews</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
            What our clients say.
          </h2>
        </FadeUpSection>

        {/* Desktop Grid */}
        <div className="reviews-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <FadeUpSection
              key={r.name}
              delay={i * 0.1}
              as="article"
              className="bg-stone p-8 md:p-10 flex flex-col"
            >
              <div className="flex gap-1 text-primary mb-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-display text-xl md:text-2xl text-foreground leading-snug flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="font-medium text-foreground">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.location}</div>
              </div>
            </FadeUpSection>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="reviews-slider"
          >
            {reviews.map((r) => (
              <div key={r.name} className="reviews-slide">
                <div className="reviews-slide-stars">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" strokeWidth={0} className="inline-block" />
                  ))}
                </div>
                <p className="reviews-slide-text">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div>
                  <div className="reviews-slide-name">{r.name}</div>
                  <div className="text-[11px] text-[#A8A29E]">{r.location}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="reviews-dots">
            {reviews.map((_, i) => (
              <div
                key={i}
                className={`reviews-dot ${activeSlide === i ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .reviews-grid {
            display: none !important;
          }

          .reviews-slider {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
            gap: 16px;
            padding: 0 24px;
            margin: 0 -24px;
          }

          .reviews-slider::-webkit-scrollbar {
            display: none;
          }

          .reviews-slide {
            flex-shrink: 0;
            width: calc(100vw - 64px);
            scroll-snap-align: center;
            background: #FFFFFF;
            border: 0.5px solid #E8E2D8;
            border-radius: 12px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          }

          .reviews-slide-stars {
            color: #C4291C;
            display: flex;
            gap: 2px;
          }

          .reviews-slide-text {
            font-family: Inter, sans-serif;
            font-size: 14px;
            color: #1A1A1A;
            line-height: 1.7;
            font-style: italic;
            margin: 0;
          }

          .reviews-slide-name {
            font-family: Inter, sans-serif;
            font-weight: 600;
            font-size: 13px;
            color: #6B6560;
          }

          .reviews-dots {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 16px;
          }

          .reviews-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(0,0,0,0.15);
            transition: all 0.3s ease;
          }

          .reviews-dot.active {
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

export default Reviews;
