import { motion, useReducedMotion } from "framer-motion";
import { Shield, Star, CheckCircle2, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HERO_IMAGE = heroBg;

const Hero = () => {
  const reduce = useReducedMotion();

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
    <section
      id="top"
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* Background Image */}
      <motion.img
        {...imageMotion}
        src={HERO_IMAGE}
        alt="Tony's Painting professional painting exterior"
        loading="eager"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
          zIndex: 0,
        }}
      />

      {/* Overlay left to right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.20) 70%, rgba(0,0,0,0.05) 100%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 40%)",
        }}
      />
      {/* Top vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, transparent 20%)",
        }}
      />

      {/* Content anchored left */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "680px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <motion.h1
          {...fadeUp(0)}
          className="hero-headline"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: "#F5F1EB",
            margin: 0,
          }}
        >
          Painting and remodeling<br />
          you can <span style={{ color: "#C4291C" }}>actually trust.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.7,
            maxWidth: "500px",
            margin: 0,
          }}
        >
          Since 2004, Tony's team has brought precision and care to every project in the region.
        </motion.p>

        <motion.div
          {...fadeUp(0.5)}
          className="hero-buttons"
          style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}
        >
          <a
            href="/contact"
            className="hero-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              backgroundColor: "#C4291C",
              color: "white",
              padding: "13px 26px",
              borderRadius: "8px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(196,41,28,0.35)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            Get Free Estimate <span>→</span>
          </a>

          <a
            href="tel:+15089829675"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "white",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Phone size={16} fill="white" />
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500 }}>
              508 982 9675
            </span>
          </a>
        </motion.div>

        <motion.div
          {...fadeUp(0.7)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            flexWrap: "wrap",
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ color: "#C4291C", display: "flex" }}>{stat.icon}</div>
                <div>
                  <div
                    style={{
                      color: "white",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "15px",
                      lineHeight: 1,
                    }}
                  >
                    {stat.title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      marginTop: "2px",
                    }}
                  >
                    {stat.desc}
                  </div>
                </div>
              </div>
              {idx < stats.length - 1 && (
                <div
                  className="hero-stat-divider"
                  style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.12)" }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .hero-content {
          padding: 80px 40px 80px 80px;
        }
        .hero-headline {
          font-size: clamp(36px, 4.2vw, 64px);
        }
        @media (max-width: 767px) {
          .hero-content {
            padding: 80px 24px 60px 24px;
          }
          .hero-headline {
            font-size: clamp(32px, 8vw, 48px);
          }
          .hero-cta {
            width: 100%;
          }
          .hero-stat-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
