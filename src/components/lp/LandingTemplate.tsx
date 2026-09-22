import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Check } from "lucide-react";
import LPForm from "./LPForm";
import LPMiniForm from "./LPMiniForm";

interface Review { name: string; text: string; }
interface IncludedItem { title: string; description: string; }

export interface LandingTemplateProps {
  tag: string; headline: string; subline: string; service: string;
  heroReview: Review; reviews: [Review, Review, Review];
  included: IncludedItem[]; portfolioLocations: string[];
  portfolioImages?: string[]; heroImage?: string;
}

const TRUST_SIGNALS = ["Licensed and Insured","Free Estimates, No Commitment","5-Star Rated on Google","Serving New England since 2004","Response within one business day"];
const TRUST_SIGNALS_MOBILE = ["Licensed and Insured","Free Estimates","20+ Years Experience"];
const STEPS = [
  { n:"01", title:"You reach out", desc:"Fill out the form or call us directly. We will get back to you within one business day." },
  { n:"02", title:"We visit and estimate", desc:"A member of our team visits your space and provides a free detailed estimate." },
  { n:"03", title:"We get to work", desc:"Once you approve the estimate, we schedule the job and deliver the result on time." },
];

const Stars5 = ({ size=14 }: { size?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({length:5}).map((_,i)=><Star key={i} size={size} style={{color:"#C4291C",fill:"#C4291C"}}/>)}
  </div>
);

const Carousel = ({
  children,
  peekWidth = "82vw",
  desktopCols = 1,
  maxWidthDesktop = "1100px",
  cardHeight,
}: {
  children: React.ReactNode[];
  peekWidth?: string;
  desktopCols?: number;
  maxWidthDesktop?: string;
  cardHeight?: string;
}) => {
  const mobileRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;
    const onScroll = () => {
      const itemW = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 10 : el.offsetWidth;
      setActive(Math.round(el.scrollLeft / itemW));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      {/* Mobile: carrossel com peek e sem captura do scroll vertical */}
      <div
        ref={mobileRef}
        className="md:hidden"
        style={{
          display: "flex",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          overscrollBehaviorX: "contain",
          gap: "10px",
          paddingRight: "20px",
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: peekWidth,
              scrollSnapAlign: "start",
              height: cardHeight,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dots — mobile only */}
      {children.length > 1 && (
        <div
          className="md:hidden"
          style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "12px" }}
        >
          {children.map((_, i) => (
            <div
              key={i}
              style={{
                width: active === i ? "16px" : "5px",
                height: "5px",
                borderRadius: active === i ? "3px" : "50%",
                background: active === i ? "#C4291C" : "#D4CFC9",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Desktop: grid */}
      <div className="hidden md:block" style={{ maxWidth: maxWidthDesktop, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${desktopCols}, 1fr)`,
            gap: "16px",
          }}
        >
          {children.map((child, i) => (
            <div key={i} style={{ height: cardHeight }}>{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LandingTemplate = ({
  tag, headline, subline, service, heroReview,
  reviews, included, portfolioLocations, portfolioImages, heroImage,
}: LandingTemplateProps) => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F1EB" }}>

      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{ backgroundColor: "#2C2C2A", padding: "14px 24px" }}
      >
        <Link to="/" className="font-display" style={{ fontWeight: 900, fontSize: "18px", color: "#F5F1EB", letterSpacing: "-0.02em" }}>
          Tony's <span style={{ color: "#C4291C" }}>Painting</span>
        </Link>
        <a href="tel:+15089829675" style={{ color: "#C4291C", fontWeight: 600, fontSize: "13px" }}>
          508 982 9675
        </a>
      </header>

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-[55fr_45fr]" style={{ paddingTop: "56px" }}>
        <div
          className="px-6 py-10 md:px-[60px] md:py-[80px] flex flex-col justify-center gap-5 md:gap-7"
          style={{
            backgroundColor: "#1A1A1A",
            backgroundImage: heroImage
              ? `linear-gradient(rgba(26,26,26,0.75),rgba(26,26,26,0.75)),url(${heroImage})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "calc(100svh - 56px)",
          }}
        >
          <div>
            <span className="inline-block uppercase" style={{ color: "#C4291C", fontSize: "11px", letterSpacing: "0.1em", fontWeight: 600 }}>{tag}</span>
            <h1 className="font-display mt-3" style={{ fontWeight: 900, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#F5F1EB" }}>{headline}</h1>
            <p className="mt-4" style={{ color: "#9CA3AF", fontSize: "15px", lineHeight: 1.7, maxWidth: "460px" }}>{subline}</p>
          </div>

          {/* Trust signals desktop */}
          <ul className="hidden md:flex flex-col gap-2">
            {TRUST_SIGNALS.map(s => (
              <li key={s} className="flex items-center gap-3" style={{ color: "#E8E2D8", fontSize: "14px" }}>
                <span className="rounded-full" style={{ width: "5px", height: "5px", backgroundColor: "#C4291C", flexShrink: 0 }} />{s}
              </li>
            ))}
          </ul>

          {/* Trust signals mobile */}
          <ul className="md:hidden flex flex-col gap-2">
            {TRUST_SIGNALS_MOBILE.map(s => (
              <li key={s} className="flex items-center gap-3" style={{ color: "#E8E2D8", fontSize: "14px" }}>
                <span className="rounded-full" style={{ width: "5px", height: "5px", backgroundColor: "#C4291C", flexShrink: 0 }} />{s}
              </li>
            ))}
          </ul>

          {/* Review card — desktop only */}
          <div className="hidden md:block" style={{ backgroundColor: "#2C2C2A", borderRadius: "8px", padding: "18px" }}>
            <Stars5 size={15} />
            <p className="mt-2 italic" style={{ color: "#E8E2D8", fontSize: "13px", lineHeight: 1.6 }}>&ldquo;{heroReview.text}&rdquo;</p>
            <p className="mt-2" style={{ color: "#9CA3AF", fontSize: "12px", fontWeight: 500 }}>{heroReview.name}</p>
          </div>

          {/* CTA mobile — scroll para o form */}
          <a
            href="#form-mobile"
            className="md:hidden"
            style={{
              display: "block",
              marginTop: "4px",
              background: "#C4291C",
              color: "white",
              padding: "15px 28px",
              borderRadius: "6px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Get My Free Estimate
          </a>
        </div>

        {/* Form desktop */}
        <div className="hidden md:flex px-12 py-[60px] flex-col justify-center" style={{ backgroundColor: "#F5F1EB" }}>
          <div className="w-full max-w-md mx-auto">
            <LPForm service={service} />
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ backgroundColor: "#F5F1EB", padding: "clamp(36px,5vw,64px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            What's included.
          </h2>
          <Carousel peekWidth="76vw" desktopCols={4} maxWidthDesktop="1100px" cardHeight="72px">
            {included.map(item => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8E2D8",
                  borderRadius: "8px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  height: "100%",
                }}
              >
                <Check size={16} style={{ color: "#C4291C", flexShrink: 0 }} />
                <p style={{ color: "#1A1A1A", fontSize: "13px", fontWeight: 600, lineHeight: 1.3 }}>{item.title}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ backgroundColor: "#E8E2D8", padding: "clamp(36px,5vw,64px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            How it works.
          </h2>
          <Carousel peekWidth="78vw" desktopCols={3} maxWidthDesktop="1100px">
            {STEPS.map(s => (
              <div key={s.n} style={{ padding: "4px 4px 12px" }}>
                <div className="font-display" style={{ fontWeight: 900, fontSize: "48px", color: "#C4291C", opacity: 0.25, lineHeight: 1 }}>{s.n}</div>
                <h3 style={{ color: "#1A1A1A", fontSize: "16px", fontWeight: 700, marginTop: "8px" }}>{s.title}</h3>
                <p style={{ color: "#6B6560", fontSize: "13px", marginTop: "6px", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* RECENT WORK */}
      <section style={{ backgroundColor: "#F5F1EB", padding: "clamp(36px,5vw,64px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            Recent work.
          </h2>
          <Carousel peekWidth="75vw" desktopCols={3} maxWidthDesktop="1100px">
            {portfolioLocations.map((loc, i) => (
              <div key={`${loc}-${i}`}>
                <div
                  style={{
                    backgroundColor: "#E8E2D8",
                    width: "100%",
                    height: "220px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  {portfolioImages?.[i] && (
                    <img
                      src={portfolioImages[i]}
                      alt={`Painting project in ${loc}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      loading="lazy"
                    />
                  )}
                </div>
                <p style={{ color: "#6B6560", fontSize: "11px", marginTop: "6px" }}>{loc}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(36px,5vw,64px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            What our clients say.
          </h2>
          <Carousel peekWidth="80vw" desktopCols={3} maxWidthDesktop="1100px" cardHeight="180px">
            {reviews.map(r => (
              <div
                key={r.name}
                style={{
                  backgroundColor: "#F5F1EB",
                  border: "1px solid #E8E2D8",
                  borderRadius: "8px",
                  padding: "20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Stars5 />
                  <p style={{ color: "#1A1A1A", fontSize: "13px", lineHeight: 1.65, marginTop: "12px" }}>&ldquo;{r.text}&rdquo;</p>
                </div>
                <p style={{ color: "#6B6560", fontSize: "12px", fontWeight: 600, marginTop: "12px" }}>{r.name}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* FORM MOBILE */}
      <section
        id="form-mobile"
        className="md:hidden"
        style={{ backgroundColor: "#1A1A1A", padding: "clamp(40px,6vw,60px) 24px", scrollMarginTop: "56px" }}
      >
        <div style={{ maxWidth: "440px", margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: "clamp(28px,5vw,36px)", color: "#F5F1EB", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "8px" }}>
            Get your free estimate.
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>
            No commitment. We respond within one business day.
          </p>
          <LPMiniForm service={service} idPrefix="lpmobile" />
        </div>
      </section>

      {/* FINAL CTA desktop */}
      <section className="hidden md:block" style={{ backgroundColor: "#1A1A1A", padding: "clamp(60px,8vw,100px) 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: "clamp(32px,5vw,48px)", color: "#F5F1EB", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Ready to get started?
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: "15px", lineHeight: 1.6, marginTop: "12px", marginBottom: "32px" }}>
            Get in touch today and we will take care of the rest.
          </p>
          <LPMiniForm service={service} idPrefix="lpcta" />
        </div>
      </section>

      {/* STICKY CTA — mobile only, aparece apos scroll */}
      {showSticky && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: "#1A1A1A",
            borderTop: "1px solid #2C2C2A",
            padding: "12px 20px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <a
            href="tel:+15089829675"
            style={{
              flex: 1,
              display: "block",
              textAlign: "center",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Call Now
          </a>
          <a
            href="#form-mobile"
            style={{
              flex: 2,
              display: "block",
              textAlign: "center",
              padding: "12px",
              borderRadius: "6px",
              background: "#C4291C",
              color: "white",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Get Free Estimate
          </a>
        </div>
      )}

      <footer style={{ backgroundColor: "#2C2C2A" }}>
        <p style={{ textAlign: "center", color: "#6B6560", fontSize: "11px", padding: "14px 0" }}>
          Tony's Painting. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingTemplate;
