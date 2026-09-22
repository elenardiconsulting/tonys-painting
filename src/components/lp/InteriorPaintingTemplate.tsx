import { useEffect } from "react";
import { Shield, Star, CheckCircle2 } from "lucide-react";
import { useReducedMotion, motion } from "framer-motion";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import LPForm from "./LPForm";
import LPMiniForm from "./LPMiniForm";
import PartnersSection from "@/components/site/PartnersSection";
import heroBgDesktop from "@/assets/hero-bg-desktop.jpg";
import heroBgMobile from "@/assets/hero-bg-mobile.jpg";
import photo01 from "@/assets/lp/lp-photo-01.jpg.asset.json";
import photo02 from "@/assets/lp/lp-photo-02.jpg.asset.json";
import photo03 from "@/assets/lp/lp-photo-03.jpg.asset.json";
import photo04 from "@/assets/lp/lp-photo-04.jpg.asset.json";
import photo05 from "@/assets/lp/lp-photo-05.jpg.asset.json";
import photo06 from "@/assets/lp/lp-photo-06.jpg.asset.json";
import video01 from "@/assets/lp/lp-video-01.mp4.asset.json";
import video02 from "@/assets/lp/lp-video-02.mp4.asset.json";
import video03 from "@/assets/lp/lp-video-03.mp4.asset.json";
import poster01 from "@/assets/lp/lp-video-01-poster.jpg.asset.json";
import poster02 from "@/assets/lp/lp-video-02-poster.jpg.asset.json";
import poster03 from "@/assets/lp/lp-video-03-poster.jpg.asset.json";

const PHOTOS = [
  { src: photo01.url, alt: "Tony's Painting crew finishing interior walls in a Martha's Vineyard home" },
  { src: photo02.url, alt: "Interior painting project with fresh neutral walls and crisp trim" },
  { src: photo03.url, alt: "Painter rolling a clean coat on a living room wall" },
  { src: photo04.url, alt: "Finished interior with smooth walls and painted accent detail" },
  { src: photo05.url, alt: "Crew member cutting in a ceiling line by hand" },
  { src: photo06.url, alt: "Completed interior room with soft painted finish" },
];

const VIDEOS = [
  { src: video01.url, poster: poster01.url },
  { src: video02.url, poster: poster02.url },
  { src: video03.url, poster: poster03.url },
];

interface Review {
  name: string;
  text: string;
}

interface IncludedItem {
  title: string;
  description: string;
}

export interface InteriorPaintingTemplateProps {
  tag: string;
  headline: string;
  subline: string;
  service: string;
  reviews: [Review, Review, Review];
  included: IncludedItem[];
  portfolioLocations: string[];
  portfolioImages?: string[];
}

const TRUST_SIGNALS = [
  "Licensed and Insured",
  "Free Estimates, No Commitment",
  "5-Star Rated on Google",
  "Serving New England since 2004",
  "Response within one business day",
];

const STEPS = [
  {
    n: "01",
    title: "You reach out",
    desc: "Fill out the form or call us directly. We will get back to you within one business day.",
  },
  {
    n: "02",
    title: "We visit and estimate",
    desc: "A member of our team visits your space, evaluates the work and provides a free detailed estimate.",
  },
  {
    n: "03",
    title: "We get to work",
    desc: "Once you approve the estimate, we schedule the job and deliver the finished result on time.",
  },
];

const Stars5 = ({ size = 14 }: { size?: number }) => (
  <div className="flex gap-0.5" aria-label="5 star rating">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={size} style={{ color: "#C4291C", fill: "#C4291C" }} />
    ))}
  </div>
);

const InteriorPaintingTemplate = ({
  tag,
  headline,
  subline,
  service,
  reviews,
  included,
  portfolioLocations,
  portfolioImages,
}: InteriorPaintingTemplateProps) => {
  const reduce = useReducedMotion();

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh-lp2", `${vh}px`);
    };
    setVh();
    const onOrientation = () => setVh();
    window.addEventListener("orientationchange", onOrientation);
    return () => window.removeEventListener("orientationchange", onOrientation);
  }, []);

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: "easeOut" as const },
        };

  const imageMotion = reduce
    ? {}
    : {
        initial: { scale: 1.06 },
        animate: { scale: 1 },
        transition: { duration: 1.4, ease: "easeOut" as const },
      };

  const stats = [
    { icon: <Shield size={20} />, title: "20+ Years", desc: "Experience" },
    { icon: <Star size={20} />, title: "5-Star Rated", desc: "Local Company" },
    { icon: <CheckCircle2 size={20} />, title: "Quality Work", desc: "You Can Trust" },
  ];

  return (
    <div className="lp2-root min-h-screen flex flex-col" style={{ backgroundColor: "#F5F1EB" }}>
      <Navbar />

      {/* HERO adapted from site hero: dark image, overlay, Playfair headline, stats, conversion form on the right */}
      <section className="lp2-hero-section">
        <motion.picture {...imageMotion} className="lp2-hero-bg-image" style={{ willChange: "transform" }}>
          <source media="(min-width: 768px)" srcSet={heroBgDesktop} />
          <img
            src={heroBgMobile}
            alt="Tony's Painting professional interior painting"
            loading="eager"
            decoding="async"
            className="lp2-hero-bg-image"
            style={{ willChange: "transform" }}
          />
        </motion.picture>
        <div className="lp2-hero-overlay-main" />
        <div className="lp2-hero-overlay-top" />
        <div className="lp2-hero-layout-container">
          <div className="lp2-hero-content">
            <motion.h1
              {...fadeUp(0.15)}
              className="lp2-hero-headline"
            >
              <span className="lp2-txt-d">{headline}</span>
              <span className="lp2-txt-m">Professional Interior Painting Done Right.</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.3)}
              className="lp2-hero-subline"
            >
              <span className="lp2-txt-d">{subline}</span>
              <span className="lp2-txt-m">Professional painting for homeowners across Martha&apos;s Vineyard, Falmouth &amp; New England.</span>
            </motion.p>

            {/* Mobile CTA scrolls to the form */}
            <motion.a
              {...fadeUp(0.45)}
              href="#estimate"
              className="lp2-mobile-only lp2-hero-mobile-btn"
            >
              Request My Free Estimate <span aria-hidden="true">→</span>
            </motion.a>

            <motion.p
              {...fadeUp(0.5)}
              className="lp2-mobile-only lp2-hero-microcopy"
            >
              Free estimate • No commitment
            </motion.p>

            <motion.div
              {...fadeUp(0.58)}
              className="lp2-mobile-only lp2-hero-trustm"
            >
              <div className="lp2-hero-trustm-item">
                <Shield size={18} aria-hidden="true" />
                <span>Licensed<br />&amp; Insured</span>
              </div>
              <div className="lp2-hero-trustm-item">
                <Star size={18} aria-hidden="true" />
                <span>5-Star<br />Rated</span>
              </div>
              <div className="lp2-hero-trustm-item">
                <span className="lp2-hero-trustm-num" aria-hidden="true">20+</span>
                <span>Years<br />Experience</span>
              </div>
            </motion.div>

            <motion.ul
              {...fadeUp(0.5)}
              className="lp2-hero-trust"
            >
              {TRUST_SIGNALS.map((s) => (
                <li key={s}>
                  <span className="lp2-hero-trust-dot" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </motion.ul>

            <motion.div
              {...fadeUp(0.65)}
              className="lp2-hero-stats"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="lp2-hero-stat">
                  <div className="lp2-hero-stat-icon">{stat.icon}</div>
                  <div className="lp2-hero-stat-text">
                    <span className="lp2-hero-stat-title">{stat.title}</span>
                    <span className="lp2-hero-stat-sub">{stat.desc}</span>
                  </div>
                  {idx < stats.length - 1 && <div className="lp2-hero-stat-divider lp2-desktop-only" />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Desktop conversion form panel */}
          <div className="lp2-hero-form-panel lp2-desktop-only">
            <motion.div {...fadeUp(0.5)}>
              <div className="lp2-form-card">
                <LPForm service={service} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile form section (linen) */}
      <section
        id="estimate"
        className="lp2-mobile-only"
        style={{ backgroundColor: "#F5F1EB", padding: "64px 24px" }}
      >
        <div className="max-w-md mx-auto">
          <LPForm service={service} idPrefix="lpmobile" />
        </div>
      </section>

      {/* Credentials bar */}
      <section style={{ backgroundColor: "#2C2C2A" }} className="px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ padding: "20px 0" }}>
          {[
            { icon: Shield, label: "Licensed and Insured" },
            { icon: CheckCircle2, label: "Est. 2004" },
            { icon: Star, label: "500+ Projects Completed" },
            { icon: Star, label: "5-Star Google Rating" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2">
              <Icon size={20} style={{ color: "#C4291C" }} />
              <span style={{ color: "#F5F1EB", fontSize: "14px", fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section style={{ backgroundColor: "#F5F1EB", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 40px)",
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
            }}
          >
            What's included.
          </h2>
          <p style={{ color: "#6B6560", fontSize: "16px", marginTop: "8px" }}>
            Everything you need from one experienced team.
          </p>
          <div className="lp2-included grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {included.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8E2D8",
                  borderRadius: "8px",
                  padding: "20px",
                }}
              >
                <CheckCircle2 size={18} style={{ color: "#C4291C", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ color: "#1A1A1A", fontSize: "15px", fontWeight: 600 }}>{item.title}</p>
                  {item.description && (
                    <p style={{ color: "#6B6560", fontSize: "13px", marginTop: "2px" }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ backgroundColor: "#E8E2D8", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display text-center"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 40px)",
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
            }}
          >
            How it works.
          </h2>
          <div className="lp2-steps mt-12">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div
                  className="font-display"
                  style={{
                    fontWeight: 900,
                    fontSize: "64px",
                    color: "#C4291C",
                    opacity: 0.3,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.n}
                </div>
                <h3 className="mt-2" style={{ color: "#1A1A1A", fontSize: "18px", fontWeight: 700 }}>
                  {s.title}
                </h3>
                <p style={{ color: "#6B6560", fontSize: "14px", marginTop: "8px", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection />

      {/* Reviews */}
      <section className="lp2-sec-reviews" style={{ backgroundColor: "#FFFFFF", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 40px)",
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
            }}
          >
            What our clients say.
          </h2>
          <div className="lp2-reviews grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {reviews.map((r) => (
              <div
                key={r.name}
                style={{
                  backgroundColor: "#F5F1EB",
                  border: "1px solid #E8E2D8",
                  borderRadius: "8px",
                  padding: "24px",
                }}
              >
                <Stars5 />
                <p className="mt-3" style={{ color: "#1A1A1A", fontSize: "14px", lineHeight: 1.7 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="mt-3" style={{ color: "#6B6560", fontSize: "13px", fontWeight: 600 }}>
                  {r.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent work: masonry gallery preserving full photos, no forced cropping */}
      <section style={{ backgroundColor: "#F5F1EB", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 40px)",
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
            }}
          >
            Recent work.
          </h2>
          <p style={{ color: "#6B6560", fontSize: "16px", marginTop: "8px" }}>
            Real homes, real crews, finished the way we would want our own house done.
          </p>

          <div className="lp2-carousel mt-10">
            {PHOTOS.map((p) => (
              <figure key={p.src} className="lp2-photo-item">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Video section: 9:16 cards matching native portrait, no crop */}
      <section style={{ backgroundColor: "#2C2C2A", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 40px)",
              color: "#F5F1EB",
              letterSpacing: "-0.02em",
            }}
          >
            See it in motion.
          </h2>
          <p style={{ color: "rgba(245,241,235,0.65)", fontSize: "16px", marginTop: "8px" }}>
            Short clips from recent interior jobs.
          </p>

          <div className="lp2-carousel lp2-carousel-video mt-10">
            {VIDEOS.map((v, i) => (
              <div key={v.src} className="lp2-video-card">
                <video
                  src={v.src}
                  poster={v.poster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  aria-label={`Tony's Painting interior work clip ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: "#1A1A1A", padding: "100px 24px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-display"
            style={{
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 48px)",
              color: "#F5F1EB",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Ready to get started?
          </h2>
          <p className="mt-4" style={{ color: "#9CA3AF", fontSize: "16px", lineHeight: 1.6 }}>
            Get in touch today and we will take care of the rest.
          </p>
          <div className="mt-10">
            <LPMiniForm service={service} idPrefix="lpcta" />
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .lp2-desktop-only { display: block; }
        .lp2-mobile-only { display: none; }
        .lp2-txt-m { display: none; }

        .lp2-hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background-color: #1A1A1A;
          display: flex;
          align-items: center;
        }

        .lp2-hero-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          z-index: 0;
        }

        .lp2-hero-overlay-main {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.20) 70%, rgba(0,0,0,0.05) 100%);
        }

        .lp2-hero-overlay-top {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, transparent 20%);
        }

        .lp2-hero-section::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 40%);
          pointer-events: none;
        }

        .lp2-hero-layout-container {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          padding: 96px 80px 64px 80px;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .lp2-hero-content {
          flex: 1;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .lp2-hero-eyebrow {
          display: inline-block;
          text-transform: uppercase;
          color: #C4291C;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 0.18em;
          font-weight: 600;
        }

        .lp2-hero-headline {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(36px, 4.2vw, 60px);
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: #F5F1EB;
          margin: 0;
        }

        .lp2-hero-subline {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: rgba(255,255,255,0.78);
          line-height: 1.7;
          max-width: 500px;
          margin: 0;
        }

        .lp2-hero-mobile-btn {
          display: inline-block;
          background: #C4291C;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 24px;
          border-radius: 10px;
          text-decoration: none;
          width: fit-content;
        }

        .lp2-hero-trust {
          list-style: none;
          padding: 18px 0 0 0;
          margin: 0;
          border-top: 1px solid rgba(255,255,255,0.12);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 28px;
        }
        .lp2-hero-trust li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.82);
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
        }
        .lp2-hero-trust-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C4291C;
          flex-shrink: 0;
        }

        .lp2-hero-stats {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-top: 16px;
        }
        .lp2-hero-stat {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .lp2-hero-stat-text {
          display: flex;
          flex-direction: column;
        }
        .lp2-hero-stat-icon { color: #C4291C; display: flex; }
        .lp2-hero-stat-title {
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 15px;
          line-height: 1;
        }
        .lp2-hero-stat-sub {
          color: rgba(255,255,255,0.45);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          margin-top: 2px;
        }
        .lp2-hero-stat-divider {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.12);
        }

        .lp2-hero-form-panel {
          width: 420px;
          flex-shrink: 0;
        }
        .lp2-form-card {
          background: rgba(245,241,235,0.97);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(232,226,216,0.8);
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }

        .lp2-carousel {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .lp2-carousel::-webkit-scrollbar { display: none; }
        .lp2-carousel > * {
          flex: 0 0 calc((100% - 24px) / 3);
          scroll-snap-align: start;
        }
        .lp2-steps {
          display: flex;
          gap: 40px;
        }
        .lp2-steps > * { flex: 1 1 0; min-width: 0; }
        .lp2-photo-item {
          margin: 0;
          border-radius: 10px;
          overflow: hidden;
          background: #E8E2D8;
        }
        .lp2-photo-item img {
          width: 100%;
          height: auto;
          display: block;
          content-visibility: visible;
          transition: transform 0.6s ease;
        }
        .lp2-photo-item:hover img { transform: scale(1.02); }

        .lp2-work-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 12px;
        }
        .lp2-work-col {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
        }
        .lp2-work-grid figure {
          position: relative;
          margin: 0;
          overflow: hidden;
          border-radius: 10px;
          background: #E8E2D8;
        }
        .lp2-work-grid img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          content-visibility: visible;
          transition: transform 0.6s ease;
        }
        .lp2-work-grid figure:hover img { transform: scale(1.04); }
        .lp2-work-hero { aspect-ratio: 4 / 5; }
        .lp2-work-tile { aspect-ratio: 16 / 10; }
        .lp2-work-grid figcaption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 28px 16px 14px 16px;
          color: #F5F1EB;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 0.04em;
          background: linear-gradient(to top, rgba(0,0,0,0.65), transparent);
        }

        .lp2-video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .lp2-video-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #1A1A1A;
          border: 1px solid rgba(245,241,235,0.10);
          aspect-ratio: 9 / 16;
        }
        .lp2-video-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 767px) {

          .lp2-desktop-only { display: none !important; }
          .lp2-mobile-only { display: block; }
          .lp2-txt-d { display: none !important; }
          .lp2-txt-m { display: inline; }

          /* Mobile conversion-focused hero (paid traffic) */
          .lp2-hero-section {
            min-height: 100svh;
            height: 100svh;
            align-items: stretch;
          }
          .lp2-hero-layout-container {
            display: flex;
            flex-direction: column;
            min-height: 100%;
            padding: 92px 24px 36px 24px;
          }
          .lp2-hero-overlay-main {
            background: linear-gradient(
              180deg,
              rgba(0,0,0,0.20) 0%,
              rgba(0,0,0,0.40) 32%,
              rgba(0,0,0,0.76) 72%,
              rgba(0,0,0,0.92) 100%
            );
          }
          .lp2-hero-section::after { display: none; }
          .lp2-hero-content {
            gap: 0;
            max-width: 500px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          /* Title and subline vertically centered; CTA anchored to the bottom */
          .lp2-hero-headline {
            margin-top: auto;
            font-size: clamp(38px, 10.4vw, 44px);
            line-height: 1.02;
            margin-bottom: 14px;
            text-align: center;
          }
          .lp2-hero-subline {
            font-size: 16px;
            line-height: 1.45;
            color: rgba(255,255,255,0.85);
            margin-bottom: 22px;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }
          .lp2-hero-eyebrow {
            font-size: 11.5px;
            letter-spacing: 2px;
            font-weight: 600;
            margin-bottom: 12px;
          }
          .lp2-hero-mobile-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            height: 56px;
            padding: 0 20px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 16px;
            margin-top: auto;
          }
          .lp2-hero-microcopy {
            margin: 8px 0 0 0;
            text-align: center;
            font-family: 'Montserrat', sans-serif;
            font-size: 12.5px;
            color: rgba(255,255,255,0.65);
          }
          .lp2-hero-trust { display: none; }
          .lp2-hero-stats { display: none; }
          .lp2-hero-trustm {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            margin-top: 28px;
            padding-top: 18px;
            border-top: 1px solid rgba(255,255,255,0.14);
          }
          .lp2-hero-trustm-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            color: rgba(255,255,255,0.85);
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            font-weight: 500;
            line-height: 1.3;
          }
          .lp2-hero-trustm-item svg { color: #C4291C; flex-shrink: 0; margin-top: 1px; }
          .lp2-hero-trustm-num {
            color: #C4291C;
            font-family: 'Playfair Display', serif;
            font-weight: 900;
            font-size: 18px;
            line-height: 1.1;
            flex-shrink: 0;
          }
          .lp2-hero-stat-divider { display: none; }
          .lp2-work-grid { grid-template-columns: 1fr; }
          .lp2-work-hero { aspect-ratio: 3 / 4; }
          .lp2-carousel > * { flex: 0 0 82vw; }
          .lp2-carousel-video > * { flex: 0 0 72vw; }

          /* Uniform 3:4 portrait photos on mobile */
          .lp2-photo-item { height: auto; aspect-ratio: 3 / 4; }
          .lp2-photo-item img { height: 100%; width: 100%; object-fit: cover; }

          /* Reviews section moves to the end of the page on mobile */
          .lp2-sec-reviews { order: 1; }
          .lp2-root footer { order: 2; }

          /* Shared mobile carousel behavior: snap one card at a time */
          .lp2-carousel,
          .lp2-included,
          .lp2-reviews,
          .lp2-steps {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding-left: 0;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            gap: 12px;
          }
          .lp2-carousel::-webkit-scrollbar,
          .lp2-included::-webkit-scrollbar,
          .lp2-reviews::-webkit-scrollbar,
          .lp2-steps::-webkit-scrollbar { display: none; }
          .lp2-carousel > *,
          .lp2-included > *,
          .lp2-reviews > *,
          .lp2-steps > * {
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }
          .lp2-included > * { flex: 0 0 80vw; }
          .lp2-reviews > * { flex: 0 0 82vw; }
          .lp2-steps > * { flex: 0 0 78vw; }
        }
      `}</style>
    </div>
  );
};

export default InteriorPaintingTemplate;
