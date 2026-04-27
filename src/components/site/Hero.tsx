import { useState, FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Shield, Star, CheckCircle2, Calendar } from "lucide-react";
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
      className="relative w-full min-h-screen overflow-hidden flex items-center md:items-center"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* Background Image Layer */}
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
          zIndex: 0,
        }}
      />

      {/* Desktop Overlays */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.20) 70%, rgba(0,0,0,0.05) 100%)",
        }}
      />
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 40%)",
        }}
      />
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, transparent 20%)",
        }}
      />

      {/* Mobile Overlays */}
      <div
        className="md:hidden"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.90) 30%, rgba(0,0,0,0.60) 55%, rgba(0,0,0,0.20) 75%, rgba(0,0,0,1) 100%)",
        }}
      />
      <div
        className="md:hidden"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, transparent 15%)",
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
        }}
      >
        {/* Content Panel */}
        <div
          className="hero-content-panel"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.h1
            {...fadeUp(0)}
            className="hero-headline"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            <span className="desktop-only">
              Painting and remodeling<br />
              you can <span style={{ color: "#C4291C" }}>actually trust.</span>
            </span>
            <span className="mobile-only">
              <span style={{ color: '#C4291C' }}>Painting</span> and<br />
              remodeling<br />
              you can <span style={{ color: '#C4291C' }}>trust.</span>
            </span>
          </motion.h1>

          <div className="mobile-only hero-mobile-divider" />

          <motion.p
            {...fadeUp(0.3)}
            className="hero-subline"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Since 2004, Tony's team has brought precision and care to every project in the region.
          </motion.p>

          {/* Mobile CTA */}
          <motion.a
            {...fadeUp(0.6)}
            href="/contact"
            className="mobile-only hero-cta-mobile"
          >
            <Calendar size={20} className="text-white" />
            <span className="font-['Inter'] font-bold text-[16px]">Get Free Estimate</span>
            <span className="font-['Inter'] font-bold text-[20px]">→</span>
          </motion.a>

          {/* Stats Container */}
          <motion.div
            {...fadeUp(0.7)}
            className="hero-stats-container"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="hero-stat-item">
                <div className="hero-stat-content">
                  <div className="hero-stat-icon">{stat.icon}</div>
                  <div className="hero-stat-text">
                    <div className="hero-stat-title">{stat.title}</div>
                    <div className="hero-stat-desc">{stat.desc}</div>
                  </div>
                </div>
                {idx < stats.length - 1 && (
                  <div className="hero-stat-divider-line desktop-only" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop Right Panel (Form) */}
        <div className="hero-right-panel desktop-only" style={{ width: "380px", flexShrink: 0 }}>
          <motion.div {...fadeUp(0.5)}>
            <GlassForm />
          </motion.div>
        </div>
      </div>

      <style>{`
        .desktop-only { display: block; }
        .mobile-only { display: none; }
        
        .hero-layout-container {
          padding: 0 80px;
          min-height: 100vh;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        
        .hero-headline {
          font-size: clamp(36px, 4.2vw, 64px);
          line-height: 1.02;
          color: #F5F1EB;
        }
        
        .hero-subline {
          font-size: 16px;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          max-width: 500px;
          margin-top: 20px;
        }
        
        .hero-stats-container {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.12);
          margin-top: 20px;
        }
        
        .hero-stat-item {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        
        .hero-stat-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .hero-stat-icon {
          color: #C4291C;
          display: flex;
        }
        
        .hero-stat-title {
          color: white;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 15px;
          line-height: 1;
        }
        
        .hero-stat-desc {
          color: rgba(255,255,255,0.45);
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          margin-top: 2px;
        }
        
        .hero-stat-divider-line {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.12);
        }

        @media (min-width: 768px) {
          .hero-background-image {
            object-position: center 30%;
          }
        }

        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block; }
          
          .hero-background-image {
            object-position: center center !important;
          }
          
          .hero-layout-container {
            padding: 0 24px 40px 24px;
            min-height: 100vh;
            flex-direction: column;
            justify-content: flex-end;
          }
          
          .hero-content-panel {
            width: 100%;
          }
          
          .hero-headline {
            font-size: clamp(42px, 11vw, 58px);
            line-height: 1.0;
            color: #FFFFFF;
          }
          
          .hero-mobile-divider {
            width: 48px;
            height: 3px;
            background: #C4291C;
            border-radius: 2px;
            margin: 12px 0 16px 0;
            display: block;
          }
          
          .hero-subline {
            font-size: 15px;
            color: rgba(255,255,255,0.72);
            line-height: 1.7;
            max-width: 100%;
            margin-top: 0;
            margin-bottom: 24px;
          }
          
          .hero-cta-mobile {
            display: flex !important;
            width: 100%;
            height: 58px;
            background: #C4291C;
            border-radius: 10px;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            margin-bottom: 28px;
            color: white;
            text-decoration: none;
            transition: background 0.2s;
          }
          
          .hero-cta-mobile:active {
            background: #8B1A10;
          }
          
          .hero-stats-container {
            justify-content: space-between;
            padding-top: 16px;
            margin-top: 0;
            gap: 0;
          }
          
          .hero-stat-item {
            gap: 0;
          }
          
          .hero-stat-content {
            gap: 8px;
          }
          
          .hero-stat-icon svg {
            width: 20px;
            height: 20px;
          }
          
          .hero-stat-title {
            font-size: 13px;
          }
          
          .hero-stat-desc {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
};
};

export default Hero;
