import { useState, FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Shield, Star, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";

const HERO_IMAGE = heroBg;

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

const GlassForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    project: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.service) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }
      navigate("/thank-you");
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "8px",
    padding: "0 14px",
    height: "44px",
    color: "white",
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "rgba(196, 41, 28, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(196, 41, 28, 0.30)",
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.30), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "20px",
            color: "#F5F1EB",
            margin: "0 0 4px 0",
          }}
        >
          Get a Free Estimate
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "rgba(255,255,255,0.60)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          No commitment. We respond within one business day.
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          placeholder="Full Name"
          required
          style={inputStyle}
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          onFocus={(e) => (e.target.style.borderColor = "rgba(196,41,28,0.70)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
        />
        <input
          placeholder="Phone Number"
          required
          type="tel"
          style={inputStyle}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          onFocus={(e) => (e.target.style.borderColor = "rgba(196,41,28,0.70)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
        />
      </div>

      <input
        placeholder="Email Address"
        required
        type="email"
        style={inputStyle}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        onFocus={(e) => (e.target.style.borderColor = "rgba(196,41,28,0.70)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
      />

      <select
        required
        style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
        value={formData.service}
        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        onFocus={(e) => (e.target.style.borderColor = "rgba(196,41,28,0.70)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
      >
        <option value="" disabled style={{ color: "black" }}>
          Service Needed
        </option>
        {[
          "Interior Painting",
          "Exterior Painting",
          "Remodeling",
          "Handyman Services",
          "Deck and Stairs",
          "Flooring",
          "Ceramic Tile",
          "Plastering",
          "Countertop",
          "Fence",
          "Other",
        ].map((s) => (
          <option key={s} value={s} style={{ color: "black" }}>
            {s}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Tell us about your project"
        rows={3}
        style={{ ...inputStyle, height: "auto", padding: "10px 14px", resize: "none" }}
        value={formData.project}
        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
        onFocus={(e) => (e.target.style.borderColor = "rgba(196,41,28,0.70)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
      />

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: "100%",
          height: "48px",
          background: submitting ? "#8B1A10" : "#C4291C",
          borderRadius: "8px",
          color: "white",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          border: "none",
          cursor: submitting ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          boxShadow: "0 4px 16px rgba(196,41,28,0.40)",
        }}
        onMouseEnter={(e) => !submitting && (e.currentTarget.style.background = "#8B1A10")}
        onMouseLeave={(e) => !submitting && (e.currentTarget.style.background = "#C4291C")}
      >
        {submitting ? "Sending..." : "Send My Request →"}
      </button>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: "10px",
          color: "rgba(255,255,255,0.35)",
          textAlign: "center",
          margin: 0,
        }}
      >
        Licensed and Insured. Serving New England since 2004.
      </p>
    </form>
  );
};

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
        className="hero-background-image"
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

      {/* Overlays */}
      <div
        className="hero-overlay-1"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.20) 70%, rgba(0,0,0,0.05) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 40%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, transparent 20%)",
        }}
      />

      {/* Layout Container */}
      <div
        className="hero-layout-container"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
        }}
      >
        {/* Left Panel */}
        <div
          className="hero-left-panel"
          style={{
            flex: 1,
            maxWidth: "600px",
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
            {...fadeUp(0.7)}
            className="hero-stats-container"
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

          {/* Mobile CTA Button */}
          <motion.a
            {...fadeUp(0.9)}
            href="/contact"
            className="hero-mobile-cta"
            style={{
              display: "none",
              width: "100%",
              height: "50px",
              background: "#C4291C",
              color: "white",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "16px",
              textDecoration: "none"
            }}
          >
            Get Free Estimate
          </motion.a>
        </div>

        {/* Right Panel (Form) */}
        <div className="hero-right-panel" style={{ width: "380px", flexShrink: 0 }}>
          <motion.div {...fadeUp(0.5)}>
            <GlassForm />
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-layout-container {
          padding: 0 80px;
          min-height: 100vh;
        }
        .hero-headline {
          font-size: clamp(36px, 4.2vw, 64px);
        }
        @media (max-width: 767px) {
          .hero-background-image {
            object-position: 70% center !important;
          }
          .hero-overlay-1 {
            background: linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.80) 100%) !important;
          }
          .hero-layout-container {
            padding: 100px 24px 48px 24px;
            min-height: 100vh;
            justify-content: flex-end;
          }
          .hero-left-panel {
            width: 100%;
            max-width: 100%;
            flex: none;
          }
          .hero-right-panel {
            display: none;
          }
          .hero-headline {
            font-size: clamp(32px, 8vw, 48px);
          }
          .hero-stats-container {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 16px !important;
          }
          .hero-stat-divider {
            display: none;
          }
          .hero-mobile-cta {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
