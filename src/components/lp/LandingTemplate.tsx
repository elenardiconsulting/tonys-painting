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

const TRUST_MOBILE = ["Licensed and Insured", "Free Estimates", "20+ Years Experience"];
const TRUST_DESKTOP = ["Licensed and Insured", "Free Estimates, No Commitment", "5-Star Rated on Google", "Serving New England since 2004", "Response within one business day"];
const STEPS = [
  { n: "01", title: "You reach out", desc: "Fill out the form or call us directly. We respond within one business day." },
  { n: "02", title: "We visit and estimate", desc: "A member of our team visits your space and provides a free detailed estimate." },
  { n: "03", title: "We get to work", desc: "Once you approve the estimate, we schedule the job and deliver on time." },
];

const Stars5 = () => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[0,1,2,3,4].map(i => <Star key={i} size={13} style={{ color: "#C4291C", fill: "#C4291C" }} />)}
  </div>
);

// Carrossel mobile puro — sem classes Tailwind no container critico
const MobileCarousel = ({ children, itemWidth = 280 }: { children: React.ReactNode[]; itemWidth?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gap = 10;
    const w = itemWidth + gap;
    const onScroll = () => setActive(Math.round(el.scrollLeft / w));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [itemWidth]);

  return (
    <div>
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          gap: "10px",
          paddingRight: "24px",
          overscrollBehavior: "contain auto",
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              flexGrow: 0,
              width: `${itemWidth}px`,
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            {child}
          </div>
        ))}
      </div>
      {children.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "12px" }}>
          {children.map((_, i) => (
            <div key={i} style={{
              width: active === i ? "16px" : "5px",
              height: "5px",
              borderRadius: active === i ? "3px" : "50%",
              background: active === i ? "#C4291C" : "#D4CFC9",
              transition: "all 0.2s ease",
            }} />
          ))}
        </div>
      )}
    </div>
  );
};

const LandingTemplate = ({ tag, headline, subline, service, heroReview, reviews, included, portfolioLocations, portfolioImages, heroImage }: LandingTemplateProps) => {
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const fn = () => setShowSticky(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F1EB", minHeight: "100vh" }}>

      {/* HEADER */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#2C2C2A", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "18px", color: "#F5F1EB", letterSpacing: "-0.02em", textDecoration: "none" }}>
          Tony's <span style={{ color: "#C4291C" }}>Painting</span>
        </Link>
        <a href="tel:+15089829675" style={{ color: "#C4291C", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>508 982 9675</a>
      </header>

      {/* HERO MOBILE — ocupa 100% da tela */}
      <div className="md:hidden" style={{ paddingTop: "56px" }}>
        <div style={{
          backgroundColor: "#1A1A1A",
          backgroundImage: heroImage ? `linear-gradient(rgba(26,26,26,0.8),rgba(26,26,26,0.8)),url(${heroImage})` : "none",
          backgroundSize: "cover", backgroundPosition: "center",
          minHeight: "calc(100svh - 56px)",
          padding: "32px 24px 40px",
          display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px",
        }}>
          <div>
            <span style={{ color: "#C4291C", fontSize: "11px", letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase" }}>{tag}</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "36px", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#F5F1EB", marginTop: "12px", marginBottom: 0 }}>{headline}</h1>
            <p style={{ color: "#9CA3AF", fontSize: "15px", lineHeight: 1.65, marginTop: "12px" }}>{subline}</p>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {TRUST_MOBILE.map(s => (
              <li key={s} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#E8E2D8", fontSize: "14px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#C4291C", flexShrink: 0, display: "inline-block" }} />{s}
              </li>
            ))}
          </ul>
          <a href="#form-mobile" style={{ display: "block", background: "#C4291C", color: "white", padding: "15px", borderRadius: "6px", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", textAlign: "center" }}>
            Get My Free Estimate
          </a>
        </div>
      </div>

      {/* HERO DESKTOP */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "55fr 45fr", paddingTop: "56px", minHeight: "100vh" }}>
        <div style={{
          backgroundColor: "#1A1A1A",
          backgroundImage: heroImage ? `linear-gradient(rgba(26,26,26,0.75),rgba(26,26,26,0.75)),url(${heroImage})` : "none",
          backgroundSize: "cover", backgroundPosition: "center",
          padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "28px",
        }}>
          <div>
            <span style={{ color: "#C4291C", fontSize: "11px", letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase" }}>{tag}</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#F5F1EB", marginTop: "16px", marginBottom: 0 }}>{headline}</h1>
            <p style={{ color: "#9CA3AF", fontSize: "16px", lineHeight: 1.7, marginTop: "16px", maxWidth: "460px" }}>{subline}</p>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {TRUST_DESKTOP.map(s => (
              <li key={s} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#E8E2D8", fontSize: "14px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#C4291C", flexShrink: 0, display: "inline-block" }} />{s}
              </li>
            ))}
          </ul>
          <div style={{ backgroundColor: "#2C2C2A", borderRadius: "8px", padding: "18px" }}>
            <Stars5 />
            <p style={{ color: "#E8E2D8", fontSize: "13px", lineHeight: 1.6, marginTop: "10px", fontStyle: "italic" }}>&ldquo;{heroReview.text}&rdquo;</p>
            <p style={{ color: "#9CA3AF", fontSize: "12px", fontWeight: 500, marginTop: "8px" }}>{heroReview.name}</p>
          </div>
        </div>
        <div style={{ backgroundColor: "#F5F1EB", padding: "60px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ maxWidth: "420px", margin: "0 auto", width: "100%" }}>
            <LPForm service={service} />
          </div>
        </div>
      </div>

      {/* WHAT'S INCLUDED */}
      <section style={{ backgroundColor: "#F5F1EB", padding: "clamp(36px,5vw,64px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            What's included.
          </h2>
          {/* Mobile carrossel */}
          <div className="md:hidden">
            <MobileCarousel itemWidth={240}>
              {included.map(item => (
                <div key={item.title} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E2D8", borderRadius: "8px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px", height: "64px" }}>
                  <Check size={15} style={{ color: "#C4291C", flexShrink: 0 }} />
                  <p style={{ color: "#1A1A1A", fontSize: "13px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{item.title}</p>
                </div>
              ))}
            </MobileCarousel>
          </div>
          {/* Desktop grid */}
          <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
            {included.map(item => (
              <div key={item.title} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E2D8", borderRadius: "8px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px", height: "64px" }}>
                <Check size={15} style={{ color: "#C4291C", flexShrink: 0 }} />
                <p style={{ color: "#1A1A1A", fontSize: "13px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ backgroundColor: "#E8E2D8", padding: "clamp(36px,5vw,64px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            How it works.
          </h2>
          <div className="md:hidden">
            <MobileCarousel itemWidth={260}>
              {STEPS.map(s => (
                <div key={s.n} style={{ paddingBottom: "8px" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "52px", color: "#C4291C", opacity: 0.25, lineHeight: 1 }}>{s.n}</div>
                  <h3 style={{ color: "#1A1A1A", fontSize: "16px", fontWeight: 700, marginTop: "8px", marginBottom: 0 }}>{s.title}</h3>
                  <p style={{ color: "#6B6560", fontSize: "13px", marginTop: "6px", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </MobileCarousel>
          </div>
          <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: "40px" }}>
            {STEPS.map(s => (
              <div key={s.n}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "64px", color: "#C4291C", opacity: 0.25, lineHeight: 1 }}>{s.n}</div>
                <h3 style={{ color: "#1A1A1A", fontSize: "18px", fontWeight: 700, marginTop: "8px" }}>{s.title}</h3>
                <p style={{ color: "#6B6560", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT WORK */}
      <section style={{ backgroundColor: "#F5F1EB", padding: "clamp(36px,5vw,64px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            Recent work.
          </h2>
          <div className="md:hidden">
            <MobileCarousel itemWidth={260}>
              {portfolioLocations.map((loc, i) => (
                <div key={`${loc}-${i}`}>
                  <div style={{ width: "260px", height: "195px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#E8E2D8" }}>
                    {portfolioImages?.[i] && <img src={portfolioImages[i]} alt={`Painting in ${loc}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />}
                  </div>
                  <p style={{ color: "#6B6560", fontSize: "11px", marginTop: "6px" }}>{loc}</p>
                </div>
              ))}
            </MobileCarousel>
          </div>
          <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {portfolioLocations.map((loc, i) => (
              <div key={`${loc}-${i}`}>
                <div style={{ width: "100%", height: "220px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#E8E2D8" }}>
                  {portfolioImages?.[i] && <img src={portfolioImages[i]} alt={`Painting in ${loc}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />}
                </div>
                <p style={{ color: "#6B6560", fontSize: "12px", marginTop: "8px" }}>{loc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(36px,5vw,64px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            What our clients say.
          </h2>
          <div className="md:hidden">
            <MobileCarousel itemWidth={280}>
              {reviews.map(r => (
                <div key={r.name} style={{ backgroundColor: "#F5F1EB", border: "1px solid #E8E2D8", borderRadius: "8px", padding: "18px", height: "160px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <Stars5 />
                    <p style={{ color: "#1A1A1A", fontSize: "13px", lineHeight: 1.6, marginTop: "10px" }}>&ldquo;{r.text}&rdquo;</p>
                  </div>
                  <p style={{ color: "#6B6560", fontSize: "12px", fontWeight: 600, marginTop: "10px" }}>{r.name}</p>
                </div>
              ))}
            </MobileCarousel>
          </div>
          <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {reviews.map(r => (
              <div key={r.name} style={{ backgroundColor: "#F5F1EB", border: "1px solid #E8E2D8", borderRadius: "8px", padding: "24px", height: "180px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <Stars5 />
                  <p style={{ color: "#1A1A1A", fontSize: "14px", lineHeight: 1.65, marginTop: "12px" }}>&ldquo;{r.text}&rdquo;</p>
                </div>
                <p style={{ color: "#6B6560", fontSize: "12px", fontWeight: 600, marginTop: "12px" }}>{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM MOBILE */}
      <section id="form-mobile" className="md:hidden" style={{ backgroundColor: "#1A1A1A", padding: "48px 24px", scrollMarginTop: "56px" }}>
        <div style={{ maxWidth: "440px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "32px", color: "#F5F1EB", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "8px" }}>Get your free estimate.</h2>
          <p style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>No commitment. We respond within one business day.</p>
          <LPMiniForm service={service} idPrefix="lpmobile" />
        </div>
      </section>

      {/* FINAL CTA desktop */}
      <section className="hidden md:block" style={{ backgroundColor: "#1A1A1A", padding: "100px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(32px,5vw,48px)", color: "#F5F1EB", letterSpacing: "-0.02em", lineHeight: 1.1 }}>Ready to get started?</h2>
          <p style={{ color: "#9CA3AF", fontSize: "15px", lineHeight: 1.6, marginTop: "12px", marginBottom: "32px" }}>Get in touch today and we will take care of the rest.</p>
          <LPMiniForm service={service} idPrefix="lpcta" />
        </div>
      </section>

      {/* STICKY BAR mobile */}
      {showSticky && (
        <div className="md:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "#1A1A1A", borderTop: "1px solid #333", padding: "12px 20px", display: "flex", gap: "10px" }}>
          <a href="tel:+15089829675" style={{ flex: 1, display: "block", textAlign: "center", padding: "12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Call Now
          </a>
          <a href="#form-mobile" style={{ flex: 2, display: "block", textAlign: "center", padding: "12px", borderRadius: "6px", background: "#C4291C", color: "white", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Get Free Estimate
          </a>
        </div>
      )}

      <footer style={{ backgroundColor: "#2C2C2A" }}>
        <p style={{ textAlign: "center", color: "#6B6560", fontSize: "11px", padding: "14px 0", margin: 0 }}>Tony's Painting. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingTemplate;
